import React from 'react';

// bring in firebase
import { firebase } from '../firebase';

export const CheckBox = ({ id }) => {
    const archiveTask = () => {
        firebase 
            .firestore()
            .collection('tasks')
            .doc(id)
            .update({
                archived: true, // update archived in database
            });
    };

    return (
        <div 
            className="checkbox-holder"
            data-testid="checkbox-action" //component test
            onClick={() => archiveTask()}
            onKeyDown={() => archiveTask()}
            role="button"
            tabIndex={0}
            aria-label="Set task as done and archive"
        >
            <span className="checkbox" />
        </div>
    )
}