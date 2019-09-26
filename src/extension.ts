/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

let counter = 0;
const icons = [
	'$(hubot) $(lightbulb) $(heart) $(paintcan) $(ruby) $(flame) $(zap) We\'re updating our icons here $(rocket) $(thumbsup) $(dashboard) $(telescope) $(megaphone) $(verified)',
	'$(alert) $(archive) $(arrow-both) $(arrow-down) $(arrow-left) $(arrow-right) $(arrow-small-down) $(arrow-small-left) $(arrow-small-right) $(arrow-small-up) $(arrow-up) $(beaker) $(bell) $(bold) $(book) $(bookmark) $(briefcase) $(broadcast) $(browser) $(bug) $(calendar) $(check) $(checklist) $(chevron-down) $(chevron-left) $(chevron-right) $(chevron-up) $(circle-slash) $(circuit-board) $(clippy) $(clock) $(clone) $(cloud-download) $(cloud-upload) $(code) $(color-mode) $(comment) $(comment-discussion) $(credit-card) $(dash) $(dashboard) $(database) $(desktop-download) $(device-camera) $(device-camera-video) $(device-desktop)',
	' $(device-mobile) $(diff) $(diff-added) $(diff-ignored) $(diff-modified) $(diff-removed) $(diff-renamed) $(ellipsis) $(eye) $(eye-closed) $(file) $(file-add) $(file-binary) $(file-code) $(file-directory) $(file-directory-create) $(file-media) $(file-pdf) $(file-submodule) $(file-symlink-directory) $(file-symlink-file) $(file-text) $(file-zip) $(flame) $(fold) $(fold-down) $(fold-up) $(gear) $(gift) $(gist) $(gist-fork) $(gist-new) $(gist-private) $(gist-secret) $(git-branch) $(git-commit) $(git-compare) $(git-fork-private) $(git-merge) $(git-pull-request) $(github-action) $(globe) $(grabber) $(graph) $(heart) $(history) $(home)',
	' $(horizontal-rule) $(hubot) $(inbox) $(info) $(issue-closed) $(issue-opened) $(issue-reopened) $(italic) $(jersey) $(kebab-horizontal) $(kebab-vertical) $(key) $(keyboard) $(law) $(light-bulb) $(link) $(link-external) $(list-ordered) $(list-unordered) $(location) $(lock) $(log-in) $(log-out) $(logo-github) $(mail) $(mail-read) $(mail-reply) $(mark-github) $(markdown) $(megaphone) $(mention) $(microscope) $(milestone) $(mirror) $(mirror-private) $(mirror-public) $(mortar-board) $(mute) $(no-newline) $(note) $(octoface) $(organization) $(organization-filled) $(package) $(paintcan) $(pencil) $(person) $(person-filled) $(pin) $(play)',
	' $(plug) $(plus) $(primitive-dot) $(primitive-square) $(project) $(pulse) $(question) $(quote) $(radio-tower) $(remove-close) $(reply) $(repo) $(repo-clone) $(repo-create) $(repo-force-push) $(repo-forked) $(repo-pull) $(repo-push) $(repo-sync) $(report) $(request-changes) $(rocket) $(rss) $(ruby) $(screen-full) $(screen-normal) $(search) $(server) $(settings) $(shield) $(sign-in) $(sign-out) $(smiley) $(squirrel) $(star) $(stop) $(sync) $(tag) $(tasklist) $(telescope) $(terminal) $(text-size) $(three-bars) $(thumbsdown) $(thumbsup) $(tools) $(trashcan) $(triangle-down) $(triangle-left) $(triangle-right) $(triangle-up) $(unfold)',
	'$(unmute) $(unverified) $(verified) $(versions) $(watch) $(x) $(zap)'
];

interface IColorCustomizations {
	[key: string]: string;
}

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
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
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
