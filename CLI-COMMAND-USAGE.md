cmd:

```bash

usage:
$ dal [options] [<command> [args]] [\?]

Options:
    --help

    <-S |--session>
        Init new session

    <-wd |--working-dir=>[<path-to-dir>]

    <-i |--internal=>
        Find the corresponding internal-base-metadata of this 

    --base=<path--base-dir>
        Select directory to use as base-layer.
    --base--from-descendant=<path to descendant>
        Find base dir from its descendant, and use it as base-layer.
    --base--git
        Find the top-level directory of current git-repo, and use it as base-layer.

Command:

Work with current base-layer:
    init [<-i|--internal>]

    pull [<layer selectors>]

    push [<layer selectors>]

    deduplicate [<layer selectors>]

Work with stack of current base-layer:
    layer [args]

    cmd <shell Command>


Work with layer stack:
usage:
$ dal layer <Layer sub-command>

Layer sub-command:
    add <path to layer dir> [--tag <tags>]
    remove <layer selectors>
    disable <layer selectors>
    enable <layer selectors>

```
