import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update'; //이 라이브러리를 사용하여 배열을 변경할 수 있다.
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this); //임의메소드를 만들 때는, this가 뭔지 알려주기 위해서 binding
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //handleChange 메소드를 생성하여 keyword에 접근 및 수정
    handleChange(e) {
      this.setState({
        keyword: e.target.value
      });
    }

    handleClick(key) {
      this.setState({
        selectedKey: key
      });

      console.log(key, 'is selected');
    }

    //전화번호부 추가 메소드
    handleCreate(contact) {
      this.setState({
        contactData: update(this.state.contactData, { $push: [contact] })
      });
    }

    //제거 메소드
    handleRemove() {
      this.setState({
        contactData: update(this.state.contactData,
          { $splice: [[this.state.selectedKey, 1]] }
        ),
        selectedKey: -1
      });
    }

    //수정 메소드
    handleEdit(name, phone) {
      this.setState({
        contactData: update(this.state.contactData,
          {
            [this.state.selectedKey]: {
              name: { $set: name },
              phone: { $set: phone }
            }
          }
        )
      });
    }

    render() {
        const mapToComponents = (data) => {
            data.sort((a,b) => { return a.name > b.name; }); //전화번호부 데이터 정렬
            data = data.filter(
              (contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
              }
            );

            return data.map((contact, i) => {
                return (<ContactInfo
                  contact={contact}
                  key={i}
                  onClick={() => this.handleClick(i)}/>);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                  name="keyword"
                  placeholder="Search"
                  value={this.state.keyword}
                  onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                  isSelected={this.state.selectedKey != -1}
                  contact={this.state.contactData[this.state.selectedKey]}
                  onRemove={this.handleRemove}
                />
                <ContactCreate
                  onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
