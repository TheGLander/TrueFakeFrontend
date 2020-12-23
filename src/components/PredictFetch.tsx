import FetchWrapper from "./FetchWrapper"
import React from "react"
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import green from "@material-ui/core/colors/green"
import deepOrange from "@material-ui/core/colors/deepOrange"
const styles = () =>
	createStyles({
		root: {
			"&": {
				transition: "background-color 0.5s",
				width: "50ch",
				borderRadius: "12px",
			},
		},
	})

interface APIResponse {
	"Probability of fake": number
	"Probability of true": number
}

interface PredictFetchProps extends WithStyles<typeof styles> {
	title: string
	text: string
}

class PredictFetch extends FetchWrapper<APIResponse, PredictFetchProps> {
	fetchConfig: RequestInit
	link = "https://glander.club/truefake/predict"
	componentDidUpdate(): void {
		this.fetchConfig = {
			body: JSON.stringify(this.props),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		}
		super.componentDidUpdate()
	}
	constructor(props: PredictFetchProps) {
		super(props)
	}
	render() {
		let title = ""
		let subTitle = ""
		let color = ""
		switch (this.state.fetchState.state) {
			case "fulfilled":
				if (
					this.state.fetchState.data["Probability of true"] >
					this.state.fetchState.data["Probability of fake"]
				) {
					title = "Це правда!"
					subTitle = `Імовірність правди ${Math.round(
						this.state.fetchState.data["Probability of true"] * 100
					)}% `
					color = green[500]
				} else {
					title = "Це фейк!"
					subTitle = `Імовірність фейку: ${Math.round(
						this.state.fetchState.data["Probability of fake"] * 100
					)}%`
					color = "#d32f2f"
				}
				break
			case "pending":
				title = "..."
				color = "grey"
				break
			case "rejected":
				title = "В нас щось не так!"
				subTitle = "Попробуйте знову?"
				color = "darkred"
				break
		}
		return (
			<Typography
				className={this.props.classes.root}
				style={{ backgroundColor: color }}
				variant="h5"
				align="center"
			>
				{title}
				<Typography>{subTitle}</Typography>
			</Typography>
		)
	}
}

export default withStyles(styles)(PredictFetch)
