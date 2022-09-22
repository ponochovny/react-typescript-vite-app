import { useState } from 'react'
import styled from 'styled-components'

type SelectOption = {
	label: string
	value: any
}

type SelectProps = {
	options: SelectOption[]
	value?: SelectOption
	onChange: (value: SelectOption | undefined) => void
}

const Container = styled.div`
	position: relative;
	width: 20em;
	min-height: 1.5em;
	border: 0.05em solid #777;
	display: flex;
	align-items: center;
	gap: 0.5em;
	padding: 0.5em;
	border-radius: 0.25em;
	outline: none;

	&:focus {
		border-color: hsl(200, 100%, 50%);
	}
`
const Value = styled.span`
	flex-grow: 1;
`
const ClearBtn = styled.button`
	background: none;
	color: #777;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	font-size: 1.25em;
	&:focus,
	&:hover {
		color: #333;
	}
`
const Divider = styled.div`
	background-color: #777;
	align-self: stretch;
	width: 0.05em;
`
const Caret = styled.div`
	translate: 0 25%;
	border: 0.25em solid transparent;
	border-top-color: #777;
`
type OptionsProps = {
	open: boolean
}
const Options = styled.ul<Pick<OptionsProps, 'open'>>`
	position: absolute;
	margin: 0;
	padding: 0;
	list-style: none;
	display: ${(props: any) => (props.open ? 'block' : 'none')};
	max-height: 15em;
	overflow-y: auto;
	border: 0.05em solid #777;
	border-radius: 0.25em;
	width: 100%;
	left: 0;
	top: calc(100% + 0.25em);
	background-color: #fff;
	z-index: 100;
`
const Option = styled.li`
	padding: 0.25em 0.5em;
	cursor: pointer;

	&.highlighted {
		background-color: hsl(200, 100%, 50%);
		color: white;
	}

	&.selected {
		background-color: hsl(200, 100%, 70%);
	}
`
export function Select({ value, onChange, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)

	function clearOptions() {
		onChange(undefined)
	}
	function selectOption(option: SelectOption) {
		onChange(option)
	}

	return (
		<Container
			tabIndex={0}
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<Value>{value?.label}</Value>
			<ClearBtn
				onClick={(e) => {
					e.stopPropagation()
					clearOptions()
				}}
			>
				&times;
			</ClearBtn>
			<Divider></Divider>
			<Caret></Caret>
			<Options open={isOpen}>
				{options.map((option) => (
					<Option
						key={option.label}
						onClick={(e) => {
							e.stopPropagation()
							selectOption(option)
							setIsOpen(false)
						}}
					>
						{option.label}
					</Option>
				))}
			</Options>
		</Container>
	)
}

export default Select
