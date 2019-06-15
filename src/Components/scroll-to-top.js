import React, { PureComponent } from "react";

class ScrollButton extends PureComponent {
    scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    render() {
        return (
            <footer>
                <button title="Back to top" onClick={this.scrollToTop}>Back to top</button>
            </footer>
        );
    }
}

export default ScrollButton;