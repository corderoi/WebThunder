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

    const viewModel = new Vue({
        el: '[v-view]',
        data: {
            code: '', // string,

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
            }
        }
    });

    vm = viewModel;
}

$(document).ready(main);