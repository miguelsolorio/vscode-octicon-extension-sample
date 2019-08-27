/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

let counter = 0;
const icons = [
	// '$(person) $(person-filled) $(organization) $(organization-filled)',
	'$(alert) $(arrow-down) $(arrow-left) $(arrow-right) $(arrow-small-down) $(arrow-small-left) $(arrow-small-right) $(arrow-small-up) $(arrow-up) $(beaker) $(bell) $(bold) $(book) $(bookmark) $(briefcase) $(broadcast) $(browser) $(bug) $(calendar) $(check) $(checklist) $(chevron-down) $(chevron-left) $(chevron-right) $(chevron-up) $(circle-slash) $(circuit-board) $(clippy) $(clock) $(clone) $(cloud-download) $(cloud-upload) $(code) $(color-mode) $(comment-add) $(comment-discussion) $(comment) $(credit-card) $(dash) $(dashboard) $(database) $(desktop-download) $(device-camera-video) $(device-camera) $(device-desktop)',
	'$(device-mobile) $(diff-added) $(diff-ignored) $(diff-modified) $(diff-removed) $(diff-renamed) $(diff) $(ellipsis) $(eye-unwatch) $(eye-watch) $(eye) $(file-add) $(file-binary) $(file-code) $(file-directory-create) $(file-directory) $(file-media) $(file-pdf) $(file-submodule) $(file-symlink-directory) $(file-symlink-file) $(file-text) $(file-zip) $(file) $(flame) $(fold) $(gear) $(gift) $(gist-fork) $(gist-new) $(gist-private) $(gist-secret) $(gist) $(git-branch-create) $(git-branch-delete) $(git-branch) $(git-commit) $(git-compare) $(git-fork-private) $(git-merge) $(git-pull-request-abandoned) $(git-pull-request)',
	'$(globe) $(grabber) $(graph) $(heart) $(history) $(home) $(horizontal-rule) $(hubot) $(inbox) $(info) $(issue-closed) $(issue-opened) $(issue-reopened) $(italic) $(jersey) $(kebab-horizontal) $(kebab-vertical) $(key) $(keyboard) $(law) $(light-bulb) $(link-external) $(link) $(list-ordered) $(list-unordered) $(location) $(lock) $(log-in) $(log-out) $(mail-read) $(mail-reply) $(mail) $(mark-github) $(markdown) $(megaphone) $(mention) $(microscope) $(milestone) $(mirror-private) $(mirror-public) $(mirror) $(mortar-board) $(mute) $(no-newline) $(note) $(octoface) $(organization) $(organization-filled)',
	'$(organization-outline) $(package) $(paintcan) $(pencil) $(person-add) $(person-follow) $(person) $(person-filled) $(person-outline) $(pin) $(plug) $(plus-small) $(plus) $(primitive-dot) $(primitive-square) $(project) $(pulse) $(question) $(quote) $(radio-tower) $(remove-close) $(reply) $(repo-clone) $(repo-create) $(repo-delete) $(repo-force-push) $(repo-forked) $(repo-pull) $(repo-push) $(repo-sync) $(repo) $(report) $(rocket) $(rss) $(ruby) $(screen-full) $(screen-normal) $(search-save) $(search) $(server) $(settings) $(shield) $(sign-in) $(sign-out) $(smiley) $(squirrel) $(star-add) $(star-delete) $(star) $(stop) $(sync)',
	'$(tag-add) $(tag-remove) $(tag) $(tasklist) $(telescope) $(terminal) $(text-size) $(three-bars) $(thumbsdown) $(thumbsup) $(tools) $(trashcan) $(triangle-down) $(triangle-left) $(triangle-right) $(triangle-up) $(unfold) $(unmute) $(unverified) $(verified) $(versions) $(watch) $(x) $(zap) $(archive) $(arrow-both) $(error) $(eye-closed) $(fold-down) $(fold-up) $(github-action) $(info-outline) $(play) $(remote) $(request-changes) $(smiley-outline) $(warning) '
];

export function activate({ subscriptions }: vscode.ExtensionContext) {

	// register a command that is invoked when the status bar
	// item is selected
	const myCommandId = 'octicons.showIcons';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		if (counter === icons.length - 1) {
            counter = 0;
        }
        else {
            counter++;
        }
        myStatusBarItem.text = icons[counter]
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	// register some listener that make sure the status bar 
	// item always up-to-date
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = icons[counter];
    myStatusBarItem.show();
}

function getNumberOfSelectedLines(editor: vscode.TextEditor | undefined): number {
	let lines = 0;
	if (editor) {
		lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
	}
	return lines;
}
