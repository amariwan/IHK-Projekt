# Help

1. [Starting and stopping processes](processes.md)
1. [Controlling the Daemon](daemon.md)
1. Managing clusters
1. [Installing and running apps](apps.md)
1. [Remote access and monitoring (e.g. guv-web)](remote.md)
1. [Web interface](web.md)
1. [Web interface - configuration](web-config.md)
1. [Web interface - user management](web-users.md)
1. [Programmatic access](programmatic-access.md)
1. [Programmatic access - local](programmatic-access-local.md)
1. [Programmatic access - remote](programmatic-access-remote.md)
1. [Programmatic access - events](programmatic-access-events.md)

## Managing clusters

To start an app as a cluster, add the `-i $n` option to the `guv start` command where `$n` is the number of workers you want.

The number of workers is limited by the `cluster` module to `$cores - 1` where `$cores` is the number of cores on your machine.

1. [workers](#workers)

## workers

After starting a process with `-i $num` (e.g. start ``$num` instances of a script), use the `workers` subcommand to adjust the number of cluster workers.

```sh
guv workers <pidOrName> <workers>
```

### e.g.

Make process 49308 (previously started with `-i 2`) run with 4 workers:

```sh
$ guv workers 49308 4
```

The maximum workers you can set is dependent on your system as `num_cpus - 1`
