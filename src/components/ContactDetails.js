import React from 'react';

export default class ContactDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      name: '',
      phone: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  //Edit 버튼 눌렀을 때 실행되는 메소드
  handleToggle() {
    if(!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      });
    } else {
        this.handleEdit();
    }

    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  //input 값에 변화가 있을 경우 메소드 실행
  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  handleEdit() {
    this.props.onEdit(this.state.name, this.state.phone);
  }

  render() {

    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );

    const edit = (
      <div>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </p>
        <p>
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </p>
      </div>
    )

    const view = this.state.isEdit ? edit : details;

    const blank = (<div>Not Selected</div>);

    return (
      <div>
        <h2>Details</h2>
        {this.props.isSelected ? view : blank}
        <p>
          <button onClick={this.props.onRemove}>Remove</button>
          <button onClick={this.handleToggle}>
            {this.state.isEdit ? 'OK' : 'Edit'}
          </button>
        </p>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: ''
  },
  onRemove:() => { console.error('onRemove not defined');},
  onEdit:() => { console.error('onEdit not defined');}
}
