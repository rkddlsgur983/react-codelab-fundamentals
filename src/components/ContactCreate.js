import React from 'react';

export default class ContactCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;

		this.setState(nextState);
	}

	handleClick() {
		const contact = {
			name: this.state.name,
			phone: this.state.phone
		};

		// 클릭시 전화번호부 업데이트(생성)
		this.props.onCreate(contact);

		this.setState({
			name: '',
			phone: ''
		});

		// DOM 직접접근 대신 ref로 접근
		this.nameInput.focus();
	}

	// 엔터 입력시 클릭과 동일한 메소드 실행
	handleKeyPress(e) {
		if(e.charCode === 13) {
			this.handleClick();
		}
	}

	render() {
		return (
			<div>
				<h2>Create Contact</h2>
				<p>
					<input
						type="text"
						name="name"
						placeholder="name"
						value={this.state.name}
						onChange={this.handleChange}
						ref = {(ref) => { this.nameInput = ref }}
					/>
					<input
						type="text"
						name="phone"
						placeholder="phone"
						value={this.state.phone}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
					/>
				</p>
				<button onClick={this.handleClick}>Create</button>
			</div>
		)
	}
}

ContactCreate.propTypes = {
	onCreate: React.PropTypes.func
};

// onCreate 넘겨받음
ContactCreate.defaultProps = {
	onCreate: () => { console.error('onCreate not defined');}
}
