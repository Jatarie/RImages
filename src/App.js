import React, {Component} from 'react';
import CategoryBrowser from './components/categorybrowser/CategoryBrowser'
import RedditBrowser from './components/redditbrowser/RedditBrowser'
import {Route, BrowserRouter} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div>
                        <Route path={'/r/:subreddit'} component={RedditBrowser}/>
                        <Route exact path={'/'} component={CategoryBrowser}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
