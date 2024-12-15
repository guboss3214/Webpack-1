import $ from 'jquery'
import '@css/style.css'
import { Post } from '@model/post'
import json from '@assets/data.json'
import logo from '@assets/webp.png'

const post = new Post('!!Webpack Post Title', logo)

$('pre').html(post.toString())

console.log('JSON:', json)