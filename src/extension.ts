/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

let counter = 0;
const icons = [
	'$(person) $(person-filled) $(organization) $(organization-filled)',
	// '$(activate-breakpoints) $(add) $(alert) $(archive) $(array) $(arrow-both) $(arrow-down) $(arrow-left) $(arrow-right) $(arrow-small-down) $(arrow-small-left) $(arrow-small-right) $(arrow-small-up) $(arrow-up) $(beaker) $(bell) $(bold) $(book) $(bookmark) $(boolean) $(breakpoint-conditional) $(breakpoint-conditional-unverified) $(breakpoint-log) $(breakpoint-log-unverified) $(briefcase) $(broadcast) $(browser) $(bug) $(calendar) $(case-sensitive) $(check) $(checklist) $(chevron-down) $(chevron-left) $(chevron-right) $(chevron-up) $(circle-filled) $(circle-outline) $(circle-slash) $(circuit-board)',
	// '$(class) $(clear-results) $(clippy) $(clock) $(clone) $(close) $(close-all) $(close-all-1) $(cloud-download) $(cloud-upload) $(code) $(color) $(color-mode) $(comment) $(comment-add) $(comment-discussion) $(compare-changes) $(console) $(constant) $(continue) $(controls) $(credit-card) $(current) $(current-and-breakpoint) $(dash) $(dashboard) $(database) $(debug) $(desktop-download) $(device-camera) $(device-camera-video) $(device-desktop) $(device-mobile) $(diff) $(diff-added) $(diff-ignored) $(diff-modified) $(diff-removed) $(diff-renamed) $(discard) $(disconnect-) $(download-all) $(edit)',
	// '$(editor-layout) $(ellipsis) $(empty-window) $(enumerator) $(enumerator-member) $(error) $(event) $(exclude) $(extensions) $(eye) $(eye-closed) $(eye-unwatch) $(eye-watch) $(field) $(file) $(file-add) $(file-binary) $(file-code) $(file-directory) $(file-directory-create) $(file-media) $(file-pdf) $(file-submodule) $(file-symlink-directory) $(file-symlink-file) $(file-text) $(file-zip) $(files) $(filter) $(flame) $(fold) $(fold-down) $(fold-up) $(folder) $(folder-active) $(folder-opened) $(gear) $(gift) $(gist) $(gist-fork) $(gist-new) $(gist-private) $(gist-secret) $(git-branch) $(git-branch-create)',
	// '$(git-branch-delete) $(git-commit) $(git-compare) $(git-fork-private) $(git-merge) $(git-pull-request) $(git-pull-request-abandoned) $(github-action) $(globe) $(go-to-file) $(grabber) $(graph) $(gripper) $(heart) $(history) $(home) $(horizontal-rule) $(hubot) $(inbox) $(info) $(info-outline) $(interface) $(issue-closed) $(issue-opened) $(issue-reopened) $(issue-reopened-1) $(issues) $(italic) $(jersey) $(json) $(kebab-horizontal) $(kebab-vertical) $(key) $(keyboard) $(keyword) $(law) $(light-bulb) $(lightbulb) $(lightbulb-autofix) $(link) $(link-external) $(list-ordered) $(list-unordered) $(loading)',
	// '$(location) $(lock) $(log-in) $(log-out) $(logo-gist) $(logo-github) $(mail) $(mail-read) $(mail-reply) $(mark-github) $(markdown) $(megaphone) $(mention) $(method) $(microscope) $(milestone) $(mirror) $(mirror-private) $(mirror-public) $(misc) $(more) $(mortar-board) $(move) $(multiple-windows) $(mute) $(namespace) $(new-file) $(new-folder) $(no-newline) $(note) $(numeric) $(octoface) $(open-preview) $(operator) $(organization) $(organization-filled) $(organization-outline) $(package) $(paintcan) $(parameter) $(pause) $(pencil) $(person) $(person-add) $(person-filled) $(person-follow) $(person-outline)',
	// '$(pin) $(play) $(plug) $(plus) $(plus-small) $(preserve-case) $(preview) $(primitive-dot) $(primitive-square) $(project) $(property) $(pulse) $(question) $(quote) $(radio-tower) $(reactions) $(record-keys) $(references) $(refresh) $(regex) $(remote) $(remove) $(remove-close) $(replace) $(replace-all) $(reply) $(repo) $(repo-clone) $(repo-create) $(repo-delete) $(repo-force-push) $(repo-forked) $(repo-pull) $(repo-push) $(repo-sync) $(report) $(request-changes) $(request-changes-1) $(restart) $(rocket) $(root-folder) $(root-folder-opened) $(rss) $(ruby) $(ruler) $(save) $(save-all) $(save-as) $(screen-full)',
	// '$(screen-normal) $(search) $(search-save) $(selection) $(server) $(settings) $(shield) $(sign-in) $(sign-out) $(smiley) $(smiley-outline) $(snippet) $(sort-precedence) $(source-control) $(split-horizontal) $(split-vertical) $(squirrel) $(star) $(star-add) $(star-delete) $(star-empty) $(star-full) $(star-half) $(start) $(step-into) $(step-out) $(step-over) $(stop) $(string) $(structure) $(sync) $(tag) $(tag-add) $(tag-remove) $(tasklist) $(telescope) $(terminal) $(text-size) $(three-bars) $(thumbsdown) $(thumbsup) $(tools) $(trash) $(trashcan) $(triangle-down) $(triangle-left) $(triangle-right) $(triangle-up)',
	// '$(twitter) $(unfold) $(unlock) $(unmute) $(unverified) $(variable) $(verified) $(versions) $(vm) $(vm-active) $(vm-running) $(vm-stopped) $(warning) $(watch) $(whitespace) $(whole-word) $(window) $(word-wrap) $(x) $(zap) $(zoom-in) $(zoom-out)'
	
	
	// '$(alert) $(arrow-down) $(arrow-left) $(arrow-right) $(arrow-small-down) $(arrow-small-left) $(arrow-small-right) $(arrow-small-up) $(arrow-up) $(beaker) $(bell) $(bold) $(book) $(bookmark) $(briefcase) $(broadcast) $(browser) $(bug) $(calendar) $(check) $(checklist) $(chevron-down) $(chevron-left) $(chevron-right) $(chevron-up) $(circle-slash) $(circuit-board) $(clippy) $(clock) $(clone) $(cloud-download) $(cloud-upload) $(code) $(color-mode) $(comment-add) $(comment-discussion) $(comment) $(credit-card) $(dash) $(dashboard) $(database) $(desktop-download) $(device-camera-video) $(device-camera) $(device-desktop)',
	// '$(device-mobile) $(diff-added) $(diff-ignored) $(diff-modified) $(diff-removed) $(diff-renamed) $(diff) $(ellipsis) $(eye-unwatch) $(eye-watch) $(eye) $(file-add) $(file-binary) $(file-code) $(file-directory-create) $(file-directory) $(file-media) $(file-pdf) $(file-submodule) $(file-symlink-directory) $(file-symlink-file) $(file-text) $(file-zip) $(file) $(flame) $(fold) $(gear) $(gift) $(gist-fork) $(gist-new) $(gist-private) $(gist-secret) $(gist) $(git-branch-create) $(git-branch-delete) $(git-branch) $(git-commit) $(git-compare) $(git-fork-private) $(git-merge) $(git-pull-request-abandoned) $(git-pull-request)',
	// '$(globe) $(grabber) $(graph) $(heart) $(history) $(home) $(horizontal-rule) $(hubot) $(inbox) $(info) $(issue-closed) $(issue-opened) $(issue-reopened) $(italic) $(jersey) $(kebab-horizontal) $(kebab-vertical) $(key) $(keyboard) $(law) $(light-bulb) $(link-external) $(link) $(list-ordered) $(list-unordered) $(location) $(lock) $(log-in) $(log-out) $(mail-read) $(mail-reply) $(mail) $(mark-github) $(markdown) $(megaphone) $(mention) $(microscope) $(milestone) $(mirror-private) $(mirror-public) $(mirror) $(mortar-board) $(mute) $(no-newline) $(note) $(octoface) $(organization) $(organization-filled)',
	// '$(organization-outline) $(package) $(paintcan) $(pencil) $(person-add) $(person-follow) $(person) $(person-filled) $(person-outline) $(pin) $(plug) $(plus-small) $(plus) $(primitive-dot) $(primitive-square) $(project) $(pulse) $(question) $(quote) $(radio-tower) $(remove-close) $(reply) $(repo-clone) $(repo-create) $(repo-delete) $(repo-force-push) $(repo-forked) $(repo-pull) $(repo-push) $(repo-sync) $(repo) $(report) $(rocket) $(rss) $(ruby) $(screen-full) $(screen-normal) $(search-save) $(search) $(server) $(settings) $(shield) $(sign-in) $(sign-out) $(smiley) $(squirrel) $(star-add) $(star-delete) $(star) $(stop) $(sync)',
	// '$(tag-add) $(tag-remove) $(tag) $(tasklist) $(telescope) $(terminal) $(text-size) $(three-bars) $(thumbsdown) $(thumbsup) $(tools) $(trashcan) $(triangle-down) $(triangle-left) $(triangle-right) $(triangle-up) $(unfold) $(unmute) $(unverified) $(verified) $(versions) $(watch) $(x) $(zap) $(archive) $(arrow-both) $(error) $(eye-closed) $(fold-down) $(fold-up) $(github-action) $(info-outline) $(play) $(remote) $(request-changes) $(smiley-outline) $(warning) '
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
