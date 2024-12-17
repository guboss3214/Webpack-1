import $ from 'jquery'
import { Post } from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/webp.png'

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