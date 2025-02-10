# Caret - A Modern Code Editor

[![Feature Requests](https://img.shields.io/github/issues/chewy/caret/feature-request.svg)](https://github.com/chewy/caret/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)
[![Bugs](https://img.shields.io/github/issues/chewy/caret/bug.svg)](https://github.com/chewy/caret/issues?utf8=✓&q=is%3Aissue+is%3Aopen+label%3Abug)

## The Repository

This repository is where we develop Caret, a modern code editor built on the foundation of Visual Studio Code. This source code is available to everyone under the standard [MIT license](LICENSE.txt).

## Caret

<p align="center">
  <img alt="Caret in action" src="https://user-images.githubusercontent.com/35271042/118224532-3842c400-b438-11eb-923d-a5f66fa6785a.png">
</p>

Caret is a powerful code editor that combines simplicity with advanced features that developers need for their core edit-build-debug cycle. It provides comprehensive code editing, navigation, and understanding support along with lightweight debugging, a rich extensibility model, and lightweight integration with existing tools.

Caret is updated regularly with new features and bug fixes. You can download it for Windows, macOS, and Linux.

## Contributing

There are many ways in which you can participate in this project, for example:

- [Submit bugs and feature requests](https://github.com/chewy/caret/issues), and help us verify as they are checked in
- Review [source code changes](https://github.com/chewy/caret/pulls)
- Review the documentation and make pull requests for anything from typos to additional and new content

If you are interested in fixing issues and contributing directly to the code base,
please see the document [How to Contribute](https://github.com/chewy/caret/wiki/How-to-Contribute), which covers the following:

- [How to build and run from source](https://github.com/chewy/caret/wiki/How-to-Contribute)
- [The development workflow, including debugging and running tests](https://github.com/chewy/caret/wiki/How-to-Contribute#debugging)
- [Coding guidelines](https://github.com/chewy/caret/wiki/Coding-Guidelines)
- [Submitting pull requests](https://github.com/chewy/caret/wiki/How-to-Contribute#pull-requests)
- [Finding an issue to work on](https://github.com/chewy/caret/wiki/How-to-Contribute#where-to-contribute)

## Feedback

- [Request a new feature](CONTRIBUTING.md)
- Upvote [popular feature requests](https://github.com/chewy/caret/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)
- [File an issue](https://github.com/chewy/caret/issues)
- Connect with the community on [GitHub Discussions](https://github.com/chewy/caret/discussions)

## Bundled Extensions

Caret includes a set of built-in extensions located in the [extensions](extensions) folder, including grammars and snippets for many languages. Extensions that provide rich language support (code completion, Go to Definition) for a language have the suffix `language-features`. For example, the `json` extension provides coloring for `JSON` and the `json-language-features` extension provides rich language support for `JSON`.

## Development Container

This repository includes a Development Container configuration for VS Code and GitHub Codespaces.

Docker / the Codespace should have at least **4 Cores and 6 GB of RAM (8 GB recommended)** to run full build. See the [development container README](.devcontainer/README.md) for more information.

## License

Licensed under the [MIT](LICENSE.txt) license.
