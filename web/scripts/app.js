//
// app.js
// WebThunder
//
// Created by Ian Cordero on 25 Sep 2016.
// Copyright (c) 2016 Ian Cordero. All rights reserved.
//

'use strict';

var vm;

function main() {
    // Vue config
    Vue.directive('view', {});

    // Generate greeting
    const greetings = Object.freeze([
            "Hi Bryant :)",
            "More capable than your typical web page.",
            "I am the thunder; you are the lightning.",
            "I love JavaScript. I'm not just saying that 'cause I'm made of it.",
            "My dream is to be just like Eclipse.",
            "Have you heard of an engineer named Ian Cordero? He's a real genius, you know.",
            "I compile, therefore I run.",
            "Why did the computer cross the road? ...To `GET /toTheOtherSide`!",
            "JavaScript is actually slower than lanauges like C. However for most cases this doesn't really matter.",
            "console.log('fun!');",
            "I'm actually a distant relative of Nyan Cat."
        ]),
        themes = Object.freeze([
            'sunny',
            'fiesta',
            'midnight',
            'spring'
        ]),
        greeting = greetings[_.random(greetings.length - 1)];

    const viewModel = new Vue({
        el: '[v-view]',
        data: {
            // Constants
            greeting, // string

            // Customize
            customize: false, // boolean
            theme: 'sunny', // string?

            // Input
            code: '', // string,

            // Output
            output: '', // string
            error: null // string?
        },
        methods: {
            run: function() {
                const out = [],
                    cl_intercept = function(msg) {
                        out.push(msg);
                    };
                let err = null;

                // Intercept console.log
                const code = viewModel.code
                    .replace(/console\.log/g, 'cl_intercept');

                // Eval
                try {
                    eval(code);
                } catch (e) {
                    err = e;
                }

                // Write
                if (err) {
                    viewModel.error = err;
                } else {
                    viewModel.error = null;
                }
                if (out.length) {
                    viewModel.output = out.join('\n');
                } else {
                    viewModel.output = '';
                }
            },
            clear: function() {
                viewModel.code = '';
                viewModel.output = '';
                viewModel.error = null;
            },
            toggleCustomize: function() {
                viewModel.customize = !viewModel.customize;
            },
            customChange: function() {
                const $body = $('body'),
                    theme = viewModel.theme;
                $body
                    .removeClass(_.difference(themes, [ theme ]).join(' '))
                    .addClass(theme);
            }
        }
    });

    vm = viewModel;
}

$(document).ready(main);