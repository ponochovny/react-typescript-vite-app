import { useEffect, useState } from 'react'
import styled from 'styled-components'

export type SelectOption = {
	label: string
	value: string | number
}

type MultipleSelectProps = {
	multiple: true
	value: SelectOption[]
	onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
	multiple?: false
	value?: SelectOption
	onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
	options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

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
	display: flex;
	flex-grow: 1;
	flex-wrap: wrap;
	gap: 5px;
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
const ClearSpan = styled.span`
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
type OptionProps = {
	selected: boolean
	highlighted: boolean
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
const Option = styled.li<Pick<OptionProps, 'selected' | 'highlighted'>>`
	padding: 0.25em 0.5em;
	cursor: pointer;

	background-color: ${(props: any) =>
		props.highlighted
			? 'hsl(200, 100%, 50%)'
			: props.selected
			? 'hsl(200, 100%, 70%)'
			: ''};
	color: ${(props: any) => (props.highlighted ? 'white' : '')};
`
const OptionBadgeBtn = styled.button`
	background: none;
	outline: none;
	border: 1px solid #ccc;
	padding: 3px 2px;
	display: flex;
	gap: 3px;
	align-items: center;
`
export function Select({ multiple, value, onChange, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)

	function clearOptions() {
		multiple ? onChange([]) : onChange(undefined)
	}
	function selectOption(option: SelectOption) {
		if (multiple) {
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option))
			} else {
				onChange([...value, option])
			}
		} else {
			if (option !== value) onChange(option)
		}
	}

	useEffect(() => {
		!isOpen && setHighlightedIndex(0)
	}, [isOpen])

	return (
		<Container
			tabIndex={0}
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<Value>
				{multiple
					? value.map((v) => (
							<OptionBadgeBtn
								key={v.value}
								onClick={(e) => {
									e.stopPropagation()
									selectOption(v)
								}}
							>
								{v.label}
								<ClearSpan>&times;</ClearSpan>
							</OptionBadgeBtn>
					  ))
					: value?.label}
			</Value>
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
				{options.map((option, index) => (
					<Option
						key={option.value}
						onClick={(e) => {
							e.stopPropagation()
							selectOption(option)
							setIsOpen(false)
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
						selected={multiple ? value.includes(option) : option === value}
						highlighted={index === highlightedIndex}
					>
						{option.label}
					</Option>
				))}
			</Options>
		</Container>
	)
}

export default Select
