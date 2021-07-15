import React from 'react'
import { ListItem, ListItemLabel } from "baseui/list";
import { StyledLink } from "baseui/link";
import { generateBundleUrl } from "../../../shared/util";

export default function RenderList(props) {
	if (props.error) {
		return <div>Error Loading Data</div>;
	}
	if (!(props.isLoaded)) {
		return <div>Data Still Loading ....</div>;
	}
	else if (props.bundleList.length === 0) {
		if (props.widget === "BudgetBundles")
			return <div>All the Bundles meet the budget</div>
		if (props.widget === "NewBundles")
			return <div> No new Bundles have been added in the last build</div>;
	}
	else {
		const listItems = props.bundleList.map((bundlename) => {
			return (
				<ListItem
					overrides={{
						Root: {
							style: {
								padding: 0,
							},
						},
					}}
				>
					<ListItemLabel>
						<StyledLink href={generateBundleUrl(bundlename)}>
							{bundlename}
						</StyledLink>
					</ListItemLabel>
				</ListItem>
			);
		});
		return (
			<ul
				style={{
					overflowY: "auto",
				}}
			>
				{listItems}
			</ul>
		);
	}
}