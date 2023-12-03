# Tasio Admin Dashboard


Tasio Admin Dashboard is software developed in Nodejs for Infrastructure and Application Monitoring. Simple configuration, scalable, flexible.
 It is used for the monitoring of servers, applications, networks, cloud infrastructures (public, private, hybrid), containers, storage, databases and environment sensors

Quickly gain [label](https://github.com/hexparrot/mineos-node/blob/master/generate-sslcert.sh)a complete view of your IT infrastructure, no matter how complex.

Tasio Admin Dashboard  provides powerful monitoring of networks, servers, clouds, containers and applications. Fast. Effective.

## Why Use Tasio Admin Dashbord?
Checkmk is an all-in-one IT monitoring system that helps SysAdmins and DevOps teams identify and resolve issues across their entire IT infrastructure—from simple to the most complex environments. Users are able to effectively monitor applications, servers, and networks to ensure they stay up and running through features such as state-based monitoring, log- and event-based monitoring, graphing and analytics, a customizable GUI, reporting, business intelligence, hardware and software inventory, notifications, and more.

With Checkmk’s integrated software package, users can manage state-based monitoring with 1,900 quality controlled 'smart plugins' to collect data from all kinds of hard- and software, quickly identify problems in the IT environment, and drill down with a single click. Users can also monitor logs for the analysis of error messages and forward events to trigger scripts or notifications. Tools for graphing and analytics allow users to analyze time-series metrics over long-time horizons and compare metrics across multiple graphs at a glance. Checkmk's customizable GUI allows for custom dashboards among users and groups, a customized side menu, and more.

Real-time reporting features enable users to review the history of states in one click over any desirable timeframe, as well as generate branded PDF reports. Tools for business intelligence enable users to monitor business processes by mapping dependencies of their application into a single view, as well as see availability, simulate worst-case scenarios in real time, and more. Checkmk sends out notifications to the responsible team quickly via email, SMS or 3rd party tools such as Slack, PagerDuty and VictorOps, and allows users to handle alerts centrally in distributed environments

## Monitoring core
Checkmk RE uses Nagios monitoring core. It doesn't offer container monitoring and requires a reboot to apply configuration changes.

## Data Interface ("Livestatus")
Livestatus is the main interface in Tasio Admin Dashboard. It provides live access to all data from the monitored hosts and services. The data is fetched directly from the RAM, which avoids slow hard disk access and gives fast access to the information without overloading the system too much. Access is done via a simple protocol and it is possible from all programming languages without requiring a special library.

### Web-GUI ("Multisite")
Multisite is Tasio Admin Dashbord’s web GUI. In addition to having a quick page layout, it offers user-definable views and dashboards, distributed monitoring by integrating multiple monitoring instances via Livestatus, integration of NagVis[clarification needed], an integrated LDAP connection, access to status data via web services, and much more. Dashboards and views can be differentiated for various users or groups of users, for example vSphere-specific[22] views for VMware admins. The web GUI is available in English and German.

## Setup
Tasio Admin Dashbord is completely administrable via the browser via its Setup module. This includes managing users, roles, groups, time periods, and more. Permissions can be granted in a granular way using a role concept. Existing role-based access controls (LDAP, AD) can be used for this. Checkmk works rule-based, so that the configuration remains intuitive even in complex environments, and the necessary effort is low. Automatic discovery and configuration, as well as the automatic agent update further accelerate the configuration process. An HTTP API can also be used to integrate CMDBs for accelerated configuration.

### Alert System
Several notification channels can be set up and configured with different rules for each user. For example, emails can be triggered at any time of the day, but notifications via SMS are sent only for important issues during on-call hours. The notifications can be set for all or for specific teams, e.g. notify only the storage admins about a failed hard drive. Duplicate notifications are grouped together so that no user is notified twice through a particular channel. Furthermore, users can configure their own notifications themselves. In distributed environments alerts can be managed centrally. For detected issues, actions can be triggered automatically (alarm control) via scripts. Checkmk includes integrations to email and SMS gateways as well as to communication and IT service-management solutions such as Slack , Jira , PagerDuty , OpsGenie , VictorOps and ServiceNow.

## Monitor your entire hybrid IT infrastructure

- Server
- Networks
- Applications
- Database
- Cloud
- Containers
- Storage
- Internet of Things

# Resolve issues faster
- Dynamic dashboards
- > Flexible, real-time dashboards
- Powerful visualizations
- > Interactive and dynamic visualitation options
- Infrastructure monitoring
- > Hosts and Services overviews that enable fast drill downs
- log and event Monitoring
- > Efficient processing and analysis of logs
- Availability and SLA reporting
- > Precise availability and SLA fulfillment reporting
- Notifications and alerts
- > Advanced notification system with many integrations
- Simple, flexible configuration
- > Modern, efficient and automatic configuration system



# Wiki Landing Pages

- [Securing](secure/index.md)
- [Maintenance and Troubleshooting](maint/webui.md)

# Developing and Contributing

I'd love to see contributions from the community! Whether you are most comfortable writing
HTML, CSS, or Javascript (either node or angular), feel free to reach out to me about
some of the design goals and we'll see where your efforts can best be used.

# License

See [LICENSE.md](https://github.com/hexparrot/mineos-node/blob/docs/LICENSE.md) file.

# Support

Create an issue in github or start a post on the [MineOS support forums](https://discourse.codeemo.com).
