import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

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
    }

		// 탐색 리스너
		handleChange(e) {
			this.setState({
				keyword: e.target.value
			});
		}

		// 클릭 리스너
		handleClick(key) {
			this.setState({
				selectedKey: key
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
								/>
            </div>
        );
    }
}
