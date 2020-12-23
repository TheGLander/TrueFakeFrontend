import React from "react"
import PredictFetch from "./PredictFetch"
import TextField from "@material-ui/core/TextField"
import {
	withStyles,
	WithStyles,
	createStyles,
	Theme,
} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

const styles = (theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				width: "50ch",
			},
		},
	})

interface Props extends WithStyles<typeof styles> {}

interface NewsTestInput {
	title: string
	content: string
}

interface State extends NewsTestInput {
	lastFetch: NewsTestInput | null
	error: boolean
}

class NewsTestForm extends React.Component<Props, State> {
	state: State = { title: "", content: "", error: false, lastFetch: null }
	constructor(props: Props) {
		super(props)
		this.updateTitle = this.updateTitle.bind(this)
		this.updateContent = this.updateContent.bind(this)
		this.submitArticle = this.submitArticle.bind(this)
	}
	updateTitle(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ title: event.target.value })
	}
	updateContent(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ content: event.target.value, error: false })
	}
	submitArticle(): void {
		if (this.state.content === "") {
			this.setState({ error: true })
			return
		}
		this.setState({
			lastFetch: { content: this.state.content, title: this.state.title },
		})
	}
	render(): JSX.Element {
		const styles = this.props.classes
		return (
			<Grid
				container
				justify="center"
				direction="column"
				alignItems="center"
				className={styles.root}
			>
				<TextField
					label="Заголовок"
					variant="outlined"
					onChange={this.updateTitle}
				/>

				<TextField
					label="Текст новини"
					required
					multiline
					error={this.state.error}
					rows={10}
					variant="outlined"
					onChange={this.updateContent}
				/>

				<Button
					color="primary"
					variant="contained"
					onClick={this.submitArticle}
				>
					Дiзнатися правду!
				</Button>
				{this.state.lastFetch ? (
					<PredictFetch
						title={this.state.lastFetch.title}
						text={this.state.lastFetch.content}
					/>
				) : (
					""
				)}
			</Grid>
		)

		//return <PredictFetch title="Мума кют" text="Мума кют" />
	}
}

export default withStyles(styles)(NewsTestForm)
