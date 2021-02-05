import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import React from "react"
import NewsTestForm from "./NewsTestForm"
import {
	createStyles,
	Theme,
	withStyles,
	WithStyles,
} from "@material-ui/core/styles"

const styles = (theme: Theme) =>
	createStyles({
		typography: {
			"&": {
				margin: theme.spacing(1),
				marginTop: theme.spacing(2),
				width: "70ch",
			},
		},
		img: { "&": { margin: theme.spacing(2) } },
	})

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props, {}> {
	render(): JSX.Element {
		const styles = this.props.classes
		return (
			<Grid container justify="center" direction="column" alignItems="center">
				<img
					src="https://glander.club/true-fake-picture.png"
					className={styles.img}
				></img>
				<NewsTestForm />
				<Typography className={styles.typography}>
					Це - детектор новин про коронавірус. Для того, щоби дізнатися, чи є
					новина фейком або правдою, введіть її заголовок (необов'язкове поле)
					та текст (обов'язкове поле), після чого натисніть "Дізнатися правду!".
					Детектор повідомить вам, наскільки він впевнений у своєму прогнозі.
				</Typography>
			</Grid>
		)
	}
}

export default withStyles(styles)(App)
