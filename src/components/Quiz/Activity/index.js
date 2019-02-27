import React, { Component } from 'react';
import moment from 'moment'

class Activity extends Component {
    render() {
        const {logs} = this.props

        return (
            <div>
            <h3 className="title is-4">Activity</h3>
        {Object.keys(logs).reverse().map((key, i) => {
            let iconClass = 'success',
                text = 'answered correctly';
            if (logs[key].type === 'wrong_answer') {
                iconClass = 'danger';
                text = 'answered wrongly'
            }
            return <div key={i} className="media">
                <div class="media-left">
                <span class={`icon has-text-${iconClass}`}>
                    <i class="fas fa-check-circle"></i>
                </span>
                </div>
                <div className="media-content">
                {logs[key].user} {text} {moment(logs[key].timeStamp).fromNow()}
                </div>
                </div>
        
            })
            }
            </div>
        )
    }
}

export default Activity;