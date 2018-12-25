import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

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
				// this 바인딩
				this.handleChange = this.handleChange.bind(this);
				this.handleClick = this.handleClick.bind(this);

				this.handleCreate = this.handleCreate.bind(this);
				this.handleRemove = this.handleRemove.bind(this);
				this.handleEdit = this.handleEdit.bind(this);
    }

		handleChange(e) {
			this.setState({
				keyword: e.target.value
			});
		}

		handleClick(key) {
			this.setState({
				selectedKey: key
			});
		}

		handleCreate(contact) {
			this.setState({
				contactData: update(this.state.contactData, { $push:[contact] })
			});
		}

		handleRemove() {
			// 선택된 키가 없을경우 예외처리
			if(this.state.selectedKey < 0) {
				return;
			}

			this.setState({
				contactData: update(this.state.contactData,
					{ $splice: [[this.state.selectedKey, 1]] }
				),
				selectedKey: -1 // key 선택 초기화
			});
		}

		// 이름, 전화번호 수정
		handleEdit(name, phone) {
			this.setState({
				contactData: update(this.state.contactData,
					{
						[this.state.selectedKey]: {
							name: { $set:name },
							phone: { $set: phone}
						}
					}
				)
			});
		}

    render() {
        const mapToComponents = (data) => {
					data.sort(); // 정렬
					data = data.filter(
						(contact) => {
							return (contact.name.toLowerCase()
							.indexOf(this.state.keyword) > -1) // 소문자 검색
							||
							(contact.name.indexOf(this.state.keyword) > -1); // 일반 검색
						}
					);
          return data.map((contact, i) => {
              return (
								<ContactInfo
									contact={contact}
									key={i}
									onClick={() => this.handleClick(i)}
								/>
							);
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
									isSelected = {this.state.selectedKey != -1}
									contact = {this.state.contactData[this.state.selectedKey]}
									onRemove={this.handleRemove}
									onEdit={this.handleEdit}
								/>
								<ContactCreate
									onCreate={this.handleCreate}
								/>
            </div>
        );
    }
}
