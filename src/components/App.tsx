//App.tsx
import Header from "./Header"
import List from "./List";
import Footer from "./Footer"

function App() {
	const lists = [
		{ id: "list1"},
		{ id: "list2"},
		{ id: "list3"}
	];
	return (
		<div className="app">
			<Header />
				<div className="flex">
				{lists.map((list) => (
				<List key={list.id} id={list.id} /> 
			))}
				</div>
			<Footer />
		</div>
	)
}

export default App;
