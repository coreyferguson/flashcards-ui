
import React from 'react';
import PropTypes from 'prop-types';
import mediaService from '../media/mediaService';
import './EditCardSideView.scss';
import TextareaAutosize from 'react-textarea-autosize';

export default class EditCardSideView extends React.PureComponent {
  constructor(props) {
    super(props);
    this._mediaService = props.mediaService || mediaService;
    this.uploadFile = this.uploadFile.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.side = {};
    this.state = {
      loading: false,
      imageUrl: undefined
    };
  }

  render() {
    return (
      <div className='edit-card-side-view'>
        <h2>side {this.props.sideName}</h2>
        <TextareaAutosize
          placeholder='flashcard text'
          maxRows={20}
          inputRef={tag => (this.textarea = tag)}
          onChange={this.handleTextChange} />
        <div className='media'>
          {this.viewFileUploadInput()}
          {this.viewFileUploadImage()}
          {this.state.loading && <span>loading...</span>}
        </div>
      </div>
    );
  }

  uploadFile() {
    if (!this.refs.image.files[0]) return;
    this.setState({ loading: true });
    const file = this.refs.image.files[0];
    const name = file.name;
    return this._mediaService.upload(name, file).then(() => {
      return this._mediaService.getUrl(name);
    }).then(url => {
      this.setState({ loading: false, imageUrl: url });
      this.side.image = name;
      this.handleChange();
    });
  }

  handleChange() {
    if (this.props.onChange) this.props.onChange(this.side);
  }

  handleTextChange() {
    this.side.text = this.textarea.value;
    this.handleChange();
  }

  viewFileUploadInput() {
    if (this.state.imageUrl) return;
    return (
      <input type="file" onChange={this.uploadFile} ref='image' />
    );
  }

  viewFileUploadImage() {
    if (!this.state.imageUrl) return;
    return (
      <div className='attachment'>
        <img src={this.state.imageUrl} />
        <button onClick={this.handleDelete} className='icon'>
          <i className='material-icons delete'>delete</i>
        </button>
      </div>
    );
  }

  handleDelete() {
    this.setState({ imageUrl: undefined });
    this.side.image = undefined;
    this.handleChange();
  }
}

EditCardSideView.propTypes = {
  sideName: PropTypes.string.isRequired,
  onChange: PropTypes.func
};
