import React from 'react';

export default class ContactCreate extends React.Component {
  //state 초기화
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //input 값에 변화가 있을 경우 메소드 실행
  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  //Create 버튼 클릭시 메소드 실행
  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    };

    this.props.onCreate(contact);

    this.setState({
      name: '',
      phone: ''
    });
  }

  render() {
    return (
      <div>
        <h2></h2>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    )
  }
}
