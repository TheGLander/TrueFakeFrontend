import React from "react"

interface PendingFetchState {
	state: "pending"
	promise: Promise<Response> | null
}

interface RejectedFetchState {
	state: "rejected"
	error: Error
}

interface FulfilledFetchState<T> {
	state: "fulfilled"
	data: T
}

interface WrapperState<T> {
	fetchState: PendingFetchState | RejectedFetchState | FulfilledFetchState<T>
}

export default abstract class FetchWrapper<
	R,
	P extends {} = {},
	S extends WrapperState<R> = WrapperState<R>
> extends React.Component<P, S> {
	abstract link: string
	abstract fetchConfig: RequestInit
	private oldLink: string
	private oldFetchConfig: RequestInit
	constructor(props: P) {
		super(props)
		this.state = { fetchState: { state: "pending", promise: null } } as S
		this.componentDidMount = this.componentDidUpdate
	}
	componentDidUpdate() {
		if (
			this.link === this.oldLink &&
			JSON.stringify(this.oldFetchConfig) === JSON.stringify(this.fetchConfig) // Serialize compare
		)
			return
		this.oldLink = this.link
		this.oldFetchConfig = this.fetchConfig
		const promise = fetch(this.link, this.fetchConfig)
		promise
			.then(
				(async (value: Response) =>
					this.setState({
						fetchState: { state: "fulfilled", data: await value.json() },
					})).bind(this)
			)
			.catch(
				((error: Error) => {
					this.setState({ fetchState: { state: "rejected", error } })
				}).bind(this)
			)
		this.setState({
			fetchState: { state: "pending", promise },
		})
	}
	abstract render(): JSX.Element
}
