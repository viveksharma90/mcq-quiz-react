import React from "react";
import { Jumbotron, Button, Badge } from "react-bootstrap";

class Results extends React.Component {
  reloadPage() {
    window.location.reload();
  }

  render() {
    const results = this.props.results;

    let badge = (
      <Badge pill variant="danger" className="mx-2">
        Failed
      </Badge>
    );

    if (results.passed) {
      badge = (
        <Badge pill variant="success" className="mx-2">
          Passed
        </Badge>
      );
    }

    return (
      <Jumbotron>
        <h1>Your test results</h1>
        <p>
          {results.correct} / {results.total}
          {badge}
        </p>
        <Button variant="secondary" className="mt-2" onClick={this.reloadPage}>
          Try again
        </Button>
      </Jumbotron>
    );
  }
}

export default Results;
