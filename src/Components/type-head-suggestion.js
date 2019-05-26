import React, { PureComponent } from "react";

class Suggestions extends PureComponent {
    state = {
        suggestions: this.props.data,
        isLoading: true,
    };
    loadTreeItemsFromServer(recordUri) {// + recordUri
        const xmlhr = new XMLHttpRequest();
        xmlhr.open("GET", "home/gettreeitems/" + recordUri, true);
        xmlhr.onload = () => {
            const data = JSON.parse(xmlhr.responseText);
            var updateVal = this.props.data;
            updateVal.Items = data;
            //updateVal.map((index) => { return index.Items = data });
            this.setState({
                suggestions: updateVal,
                isLoading: false,
            });
            console.log(updateVal);
        };
        xmlhr.send();
    }
    toggleHidden(index) {
        var updateVal = this.state.suggestions;
        updateVal.Collapse = !updateVal.Collapse;

        this.setState({
            ...this.state.suggestions,
            updateVal,
        });

        this.loadTreeItemsFromServer(index);
        console.log(this.state.suggestions);
    }
    render() {
        const { suggestions } = this.state;
        const { data, columns, isLoading, checked, setSearchQueryToSuggestion } = this.props;

        const options = data.map(rec => {

            const IsInternalIcon = rec.Icon.IsInternalIcon;

            let linkVal;
            if (IsInternalIcon) {
                linkVal = <img src={"/Content/icons/" + rec.IconText + "_x16.png"} />;
            } else {
                linkVal = <img src={"/Content/icons/" + rec.Icon.FileType + "_x16.png"} />;
            }

            let expandVal;
            if (rec.IsContainer && rec.Collapse) {
                expandVal = " + ";
            } else if (rec.IsContainer && !rec.Collapse) {
                expandVal = " - ";
            } else {
                expandVal = null;
            }

            const treeItems = isLoading === true && !rec.Collapse ? <Preloader /> : rec.Items !== null && rec.IsContainer && !rec.Collapse ? rec.Items.map((record, key) => {
                return (
                    <TreeItem key={key}>
                        {
                            columns.map((column, key) => {
                                return (
                                    <td className="treeitem" key={key}>
                                        {getDescendantProp(record, !checked ? column.Value : column.locationValue)}
                                    </td>
                                );
                            })
                        }
                    </TreeItem>
                );
            }) : null
            return (
                <div className="suggestions-container--open" key={rec.Uri}>
                    {
                        columns.map((column, index) => {
                            return (column.suggestionValue ?
                                <div key={index}>
                                    <div onClick={() => setSearchQueryToSuggestion(getDescendantProp(rec, !checked ? column.Value : column.locationValue))}>
                                        {getDescendantProp(rec, !checked ? column.Value : column.locationValue)}
                                    </div>
                                    <span>
                                        <div className="expand" onClick={rec.IsContainer ? () => this.toggleHidden(rec.TrimItem.Uri) : null}>
                                            {expandVal}
                                            <i>{linkVal}</i>
                                        </div>
                                    </span>
                                </div>
                                : null);
                        })}
                </div>
            );
        })
        return (
            <div className="suggestion">
                {options}
            </div>
        )
    }
}

export default Suggestions;