import React, { Component } from 'react';
import axios from 'axios'
import Post from '../redditbrowser/Post'

class Finite extends Component {

    constructor(props) {
        super(props);
        this.list = []
        this.after = ""
        this.prevRequest = 0;
        this.init = false
        this.checkViewport = this.checkViewport.bind(this)
        this.isElementInViewport = this.isElementInViewport.bind(this)
    }

    componentDidMount() {
        let options = {
            root: document.querySelector('#scrollArea'),
            rootMargin: '100px',
            threshold: 1
        }

        let callback = () => {
            if (this.prevRequest + 1000 < new Date().getTime()) {
                this.prevRequest = new Date().getTime()
                axios.get("https://api.reddit.com/r/" + this.props.subreddit + "/top" + this.props.t + "&limit=5&after=" + this.after).then(response =>
                    response.data.data.children.map(child => {
                        this.list.push([child.data.url, child.data.id])
                        this.after = response.data.data.after
                        this.setState({})
                    }
                    ))
            }
        }

        let observer = new IntersectionObserver(callback, options);

        let target = document.querySelector('.end');
        observer.observe(target);

        window.addEventListener("scroll", this.checkViewport)
    }

    isElementInViewport(id) {

        let el = document.getElementById("video_" + id)


        if (el === null) { return false }


        var rect = el.getBoundingClientRect();

        if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth) == true
        ) { el.play() }
        else{
            el.pause()
        }
    }

    checkViewport() {
        this.list.map(i => console.log(i, this.isElementInViewport(i[1])))
    }



    render() {
        return (
            <div>
                {this.list.map(i =>
                    <Post url={i[0]} post_id={i[1]} />
                )}
                <div className='end'>test</div>
            </div>
        )
    }
}

export default Finite;