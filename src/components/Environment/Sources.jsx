import React from 'react';
import { observer } from 'mobx-react';

import Source from './Source.jsx';

import 'react-table/react-table.css'

@observer
class Sources extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  sources: [],
                  fetchState: 'initialized',
            }
      }
      componentDidMount() {
            this.setState({ fetchState: 'fetching' });
            fetch('https://zjpehz8xi5.execute-api.eu-west-1.amazonaws.com/V1/sources')
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Network response was not ok.');
                  })
                  .then(json => {
                        this.setState({ sources: json.data, fetchState: 'done' })
                  })
                  .catch(e => {
                        this.setState({ fetchState: 'failed', error: e });
                  });
      }

      render() {
            const { sources, fetchState, error } = this.state;

            switch (fetchState) {
                  case 'initialized':
                        return <div><span>initialized.</span></div>
                  case 'fetching':
                        return <div><span>Fetching sources...</span></div>
                  case 'failed':
                        return (
                              <div>
                                    <span className='error'>Failed to fetch sources:</span>
                                    <span className='errorDetails'>{error.toString()}</span>                              </div>
                        )
                  case 'done':
                        return (
                              <div>
                                    <span className='sources header'>{sources.length} Sources</span>
                                    <div className='sources container'>{sources.map((source) => <Source source={source} />)}</div>
                              </div>
                        )
                  default:
                        console.error('invalid state:', fetchState)
                        return (
                              <div>
                                    <span className='error'>Implementation error</span>
                                    <span className='errorDetails'>unknown state</span>
                              </div >
                        )

            }

      }
}

export default Sources