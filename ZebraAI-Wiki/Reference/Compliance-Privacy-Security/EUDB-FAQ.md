# FAQ: Accessing EUDB from Outside the Production Boundary

## What is the approved method for engineers to access EUDB from outside the production boundary?
Engineers must use either **AVD (Azure Virtual Desktop)** or **SAW (Secure Admin Workstation)** devices. These are the only approved methods for secure EUDB access.

## Is AVD the default access method for agents and managers?
Yes. **AVD is the general access method** for agents and managers to access Case Data. However, **SAWs are verified and approved for development purposes** and may be used in lieu of AVD.

## Can SAW be used instead of AVD for EUDB access?
Yes. **SAW is independently verified and approved** for EUDB access. It provides similar protections to AVD and is especially useful for engineering workflows.

## What are the requirements for engineers accessing production tenants?
Engineers must use:
- **SAW (Secure Admin Workstation)**
- **Yubikey**
- **Production Account (non-alias account)**

These requirements are part of the standard production access policy and are designed to ensure secure handling of sensitive data.

## Why can't engineers use AVD in production tenant scenarios?
Due to the requirement for SAW + Yubikey + Production Account, engineers are restricted from using AVD in production tenant environments. These controls are by design to enforce secure access boundaries.

## Does using SAW add complexity for engineers?
No. **SAW provides equivalent protections to AVD** and is approved for EUDB access. It simplifies data handling for engineers and does not introduce additional work.

## What are the requirements for accessing Customer Data (EUII + Customer Content)?
For human access to Customer Data in telemetry or production systems, engineers must use:
- **SAW**
- **JIT (Just-In-Time access)**
- **AME (Access Management Engine)**

These are defined in the secure IDN of the production access standard.

## Are there any special steps required beyond normal production access?
No. **There are no new processes or steps required** beyond the standard production access procedures.

## What devices must developers use for EUDB access?
Developers must use **EUDB-compliant AVDs or SAWs**. Queries involving **EUPI** must be run from these devices.

## Who are the main contacts for confirmation and documentation?
- Mark Robbins-Linford  
- Daniel Avença Nunes (Daniel has provided supporting documentation)

# Reference Docs
- [EUDB AVD VDI Overview](https://microsoft.sharepoint.com/:u:/r/sites/Security_Tools_Services/SitePages/MVD-CSS/EUDBAVD.aspx?csf=1&web=1&e=EnyNyk)
- [EUDB ISD Processing Scenarios](https://microsoft.sharepoint.com/:w:/t/DataResidency/EW7K48ugWBlHqwz-rq24aYIBcasoV5XuZtuXslwY5Z44pw?e=hWLzE4)