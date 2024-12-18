import $ from 'jquery'
import { Post } from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/webp.png'
import '@model/lodash'

import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import '@css/style.css'
import './less/style.less'
import './sass/style.sass'
import './sass/style.scss'

const post = new Post('!!Webpack Post Title', logo)

$('pre').html(post.toString())

console.log('JSON:', json)

async function start() {
    return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}

start().then((res) => console.log(res))

const container = document.getElementById('root')

const root = createRoot(container)

const App = () => {
    return (
        <div className="container">
            <h1>Webpack training</h1>
            <div className="logo"></div>
            <pre />
            <div className="less-demo">
                <h2>Less Demo</h2>
            </div>
            <div className="sass-demo">
                <h2>Sass Demo</h2>
            </div>
            <div className="scss-demo">
                <h2>Scss Demo</h2>
            </div>
        </div>
    )
}

root.render(<App />)