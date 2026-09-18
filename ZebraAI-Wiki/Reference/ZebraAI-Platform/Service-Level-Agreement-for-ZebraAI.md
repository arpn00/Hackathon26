# Service Level Agreement (SLA) for ZebraAI

Last Updated Data: February 7, 2025

## Table of Contents

1. [Introduction](#introduction)  
1.1 [ZebraAI Mission](#zebraai-mission)  
1.2 [ZebraAI Vision](#zebraai-vision)  
1.3 [Team Core Values](#Team-Code-Values)  
2. [Service Level Objectives (SLO)](#Service-Level-Objectives-(SLO))  
3. [Scope](#scope)  
4. [Out of Scope](#out-of-scope)  
5. [Service Overview](#service-overview)  
6. [Incident Priority Level Definitions](#incident-priority-level-definitions)  
7. [Key Performance Indicators (KPIs)](#Key-Performance-Indicators-(KPIs))  
7.1 [Uptime Percentage](#uptime-percentage)  
7.2 [Initial Response Time](#initial-response-time)  
7.3 [Average Resolution Time](#average-resolution-time)  
7.4 [Data Availability](#data-availability)  
8. [Support Hours and Channels](#support-hours-and-channels)  
9. Responsibilities  
9.1 ZebraAI Team  
9.2 [Stakeholders/Users](#Stakeholders/Users)  
10. [Incident Management](#incident-management)  
10.1 [Incident Response Process](#incident-response-process)  
11. [Monitoring and Reporting](#monitoring-and-reporting)  
11.1 [Automated Monitoring](#automated-monitoring)  
11.2 [Regular Reports](#regular-reports)  
11.3 [Stakeholder Feedback](#stakeholder-feedback)  
11.4 [General Monitoring](#general-monitoring)  
12. [Disaster Recovery Procedures](#disaster-recovery-procedures)  
12.1 [Backup and Data Recovery](#backup-and-data-recovery)  
12.2 [Recovery Time Objective (RTO)](#Recovery-Time-Objective-(RTO))  
12.3 [Recovery Point Objective (RPO)](#Recovery-Point-Objective (RPO))  
13. [Security, Privacy, and Compliance](#Security,-Privacy,-and-Compliance)  
13.1 [Regulatory Compliance](#Regulartory-Compliance)  
13.2 [Internal Policies and Procedures](#internal-policies-and-procedures)  
13.3 [Audits and Assessments](#audits-and-assessments)  
13.4 [Data Collection and Processing](#data-collection-and-processing)  
13.5 [Data Storage](#data-storage)  
13.6 [Data Access Controls](#data-access-controls)  
13.7 [Communication and Training](#communication-and-training)  

## Introduction

This document details the Service Level Agreement (SLA) for the management of ZebraAI. ZebraAI serves as an experimentation platform that enables widespread access to Azure OpenAI and CSS Support Data through secure and compliant prompt engineering. The platform operates within the PME environment, utilizing Cornerstone as its primary data provider.

### ZebraAI Mission

ZebraAI serves as the hub for AI innovation within CSS, utilizing cutting-edge AI to optimize and enhance the support ecosystem across all functions.

### ZebraAI Vision

ZebraAI envisions a future where AI drives continuous innovation within CSS, empowering teams to experiment and push the boundaries of what is possible.

### Team Core Values

- **Security First:** 100% adherence to existing compliance, safety, security standards, RAI rules and regulations.
- **Innovation:** Continuously pushing the boundaries of technology and creativity.
- **Agility:** Maintaining the agility of our product features and functionality.
- **Collaboration:** Collaborating with stakeholders to achieve common goals.
- **Excellence:** Striving for excellence in everything we do.
- **Integrity:** Upholding the highest standards of integrity and transparency.

The primary objectives of this Service Level Agreement (SLA) for ZebraAI are to:



- **Ensure High Availability:** Guarantee a minimum uptime of 99.9% for the ZebraAI platform, ensuring that users always have reliable access to the services.
- **Maintain Performance Standards:** Ensure that the platform meets predefined performance benchmarks, including response times, throughput, and error rates, to provide a seamless user experience.
- **Data Security, Privacy, and Compliance:** Adhere to Microsoft and industry standards and regulatory requirements to ensure the security and privacy of user data, leveraging secure and compliant prompt engineering practices.
- **Transparent Reporting:** Provide regular and transparent reporting on service performance, incidents, and key performance indicators (KPIs) to stakeholders.
- **Continuous Improvement:** Collect and act on stakeholder feedback to continuously improve the quality and functionality of the ZebraAI platform.
- **Effective Incident Management:** Implement robust incident management processes to quickly identify, communicate, and resolve any issues that may arise, minimizing impact on users.
- **Support and Assistance:** Offer timely and effective support to users, ensuring that any queries or issues are addressed promptly and satisfactorily based on their criticality or business impact level.

## In Scope

This Service Level Agreement (SLA) outlines the specific ZebraAI services covered, including data ingestion, web application, and ZebraAI API. The objective of this SLA is to ensure the highest level of service quality, reliability, and performance for our stakeholders. The solution includes:

- **Data ingestion:** ZebraAI ensures secure, compliant ingestion and handling of data from various sources. Cornerstone is the primary data provider for ZebraAI.
  - Automated and manual processes for ingesting data from various sources.
  - Cleaning, transforming, and loading data for the creation of Azure AI Search indexes used by ZebraAI.
  - Secure storage of ingested data following General Data Protection Regulation (GDPR) and all other security, privacy, and compliance requirements.
- **Web App:** The web application provides a user-friendly interface for stakeholders to create prompt engineering experiments that use the data available through ZebraAI.
  - Provides secure access to the web application for authenticated users.
  - Web App is accessible and responsive across different devices and browsers.
  - Regular bi-weekly updates and enhancements.
- **ZebraAI API:** The ZebraAI API allows developers to extend ZebraAI experiments capabilities into their own applications.
  - ZebraAI API for application development and integration.
  - API is well-documented and easy to use.
  - Consulting and support are available for API-related onboarding and issues.

## Out of Scope
- **Experiment Creation and Management:** ZebraAI team does not create or maintain experiments for users. It is the user’s responsibility to create and maintain their own experiments.
- **Apps using ZebraAI API:** ZebraAI team does not develop Apps using the ZebraAI API. Consulting and samples are available for demonstration purposes only.

## Service Overview


**Description:** ZebraAI is an experimentation platform that democratizes the use of Azure OpenAI and CSS Support Data through secure and compliant prompt engineering. It accelerates the power of generative AI models, paving the way to production. ZebraAI provides a compliant and secure environment for experimentation with Azure OpenAI, unlocking creative potential for support solutions. Key capabilities include:
- Access to pre-trained models including GPT-4o, GPT-4, and more.
- Easy sample prompt access with the ability to share and reuse prompts.
- Conversation context monitoring relevant responses and follow-up information.
- Control over model output and ability to set response creativity parameters.
- Synthetic data for safe experimentation until approval criteria is met.
- Dynamic multiple sourced data insertion into prompts, including support case data.
- Hybrid search with vectorization service and search endpoint.
- A simple web interface for entering text prompts and receiving generated responses.
- Continuous collection and reporting of experiment feedback.
- LLM response evaluation via prompt test runs to refine approach.
- Availability  of a ZebraAI API connected to individual experiments.

## Incident Priority Level Definitions


|Priority| Description | Example |
|--|--|--|
| Critical (Priority 0) | Service outage or major functionality failure affecting all users | Total system crash preventing all users from accessing ZebraAI | 
| High (Priority 1) | Significant impact on service performance or a large number of users | Severe performance degradation slowing down ZebraAI for many users | 
| Medium (Priority 2) | Minor impact on service performance or affecting a smaller group of users | Feature not working correctly for a subset of users, such as an experiment returning incorrect or missing results |
| Low (Priority 3) | General inquiries or minor issues not significantly impacting service performance | User reporting a typo in the user interface or requesting information about a feature |

## Key Performance Indicators (KPIs)

The following KPIs will be used to measure the quality and effectiveness of the services provided by ZebraAI.

### Uptime Percentage

| Service | Uptime | 
|--|--| 
| ZebraAI (includes Azure services and data pipeline) | 99.9% | 
| Web Application | 99.9% |
 | API | 99.9% |

Measures the percentage of time the ZebraAI platform is operational and accessible to users. The target is typically set at 99.9% or higher and does not include weekends in the calculation. The calculation excludes Azure related outages not controlled by the ZebraAI team.

### Initial Response Time

Tracks the initial response (acknowledgement) times to ensure timely support within support hours for Critical and High priority issues. Mid and low issues will be worked during normal business hours.
| Issue Priority | Initial Response Time | 
|--|--|
 | Critical issues | 1 hour |
 | High-priority issues | 4 hours |
 | Medium-priority issues | 8 hours | 
| Low-priority issues | 24 hours |

### Average Resolution Time

Tracks the average time taken to resolve incidents and issues reported by users, from initial report to resolution.
  
 

| Issue Priority | Avg Resolution Time |
 |--|--|
 | Critical | 4 hours |
 | High priority | 8 hours |
 | Medium-priority | 24 hours | 
| Low priority | 72 hours |

### Data Availability

Tracks the availability of data through the data pipeline and to users for experimentation.

- Data Processing Time: Maximum of 4 hours
- Data Ingestion Latency: Average time taken to ingest data from source to destination. Latency is dependent on the downstream source.
  - Cornerstone (cold path): 24-48 hours delay
  - IcM: 24-48 hours delay
  - Knowledge Management (KM): 1 week
- Data Quality: 90% of data ingested without errors or discrepancies.
- Synthetic Data: Updated < 3 hours of last successful ingestion from source systems.

## Support Hours and Channels

- Support Coverage: 12/5 (12 hours a day, 5 days a week)
- Support Hours: Monday to Friday: 4 AM to 4 PM (PST)
- Support **Channels:**
  - IcM(P0 and P1): SADPZEBRAAI\IncidentManager
  - Teams(P2 and P3): ZebraAI | ZebraAI❓Questions and Help | Microsoft Teams
  - Web Form(P2 and P3): <https://aka.ms/zebraaifeedback>

![Create Incident](/wiki/imgs/Create-Incident.png)  

## Responsibilities

### ZebraAI Team

The ZebraAI team is committed to quality AI solution and ensuring its seamless operation. Team responsibilities include:

- **Availability and Uptime:** Ensuring ZebraAI is available and operational 99.9% of the time, minimizing downtime and disruptions.
- **Technical Support and Troubleshooting:** Provide timely and effective technical support and troubleshooting to address any issues that may arise.
- **Maintenance and Updates:** Regularly maintaining and updating ZebraAI to ensure its security and performance.
- **Performance Monitoring and Reporting:** Monitor service performance and key performance indicators (KPIs) to ensure the platform meets its service level commitments.

### Stakeholders/Users

Stakeholders/users play a crucial role in the effective use of the ZebraAI platform. Stakeholder responsibilities include:

- **Accurate Information:** Providing accurate and timely information when requesting support to facilitate efficient issue resolution.
- **Adherence to Guidelines:** Following the guidelines and procedures outlined for using ZebraAI to ensure proper usage and compliance.
- **Issue Reporting:** Promptly reporting any issues or bugs to the ZebraAI team to enable quick resolution and continuous improvement of the platform.

## Incident Management

Incident Reporting: Users can report incidents through multiple channels, IcM, Teams chat, and web form.

### Incident Response Process

 

| Step | Description |
 |--|--| 
| Detection | Incidents will be detected through automated monitoring tools and user reports. |
 | Notification | The support team will be notified immediately upon detection of an incident. |
 | Acknowledgment | Receipt of the incident report will be acknowledged with SLA time. |
 | Classification | The incident will be classified based on its severity by the ZebraAI team. |
 | Assignment | The incident will be assigned to the appropriate support team for resolution. |
 | Investigation | The support team will investigate the incident to identify the root cause. |
 | Communication | Regular updates will be provided to stakeholders during the incident resolution process. Critical and high-priority incidents will get updates every hour. | 
| Resolution | The support team will implement a fix to resolve the incident. |

## Monitoring and Reporting

Service performance for ZebraAI will be meticulously tracked, measured, and reported using a comprehensive set of methods to ensure optimal functionality and transparency.

### Automated Monitoring

Automated monitoring involves continuous oversight of ZebraAI’ s performance and uptime. This includes:

- **Continuous Monitoring:** Real-time tracking of system performance and availability. Currently only viewable on the backend by ZebraAI administrators.
- **Manual Checks:** Regular manual inspections to verify system integrity and functionality.

### Regular Reports

Regular reporting ensures stakeholders are informed about service performance and any issues that arise. This includes:

- **Monthly Reports:** Detailed monthly reports covering service performance, key performance indicators (KPIs), and any incidents or issues encountered.
- **Stakeholder Communication:** Sharing these reports with stakeholders to maintain transparency and accountability.

### Stakeholder Feedback

Engaging with stakeholders to gather feedback is crucial for continuous improvement. This includes:

- **Feedback Collection:** Regularly soliciting feedback from stakeholders to gauge satisfaction and identify areas for enhancement.
- **Implementation of Changes:** Making necessary adjustments based on feedback to improve service quality is dependent on prioritization.

### General Monitoring

General monitoring encompasses a range of metrics and alerting mechanisms to ensure comprehensive oversight. This includes:

- **Metrics Monitored:** Tracking key metrics such as CPU and memory usage, response times, error rates, and request throughput.
- **Log Monitoring:** Utilizing log analytics to monitor log data and detect anomalies.
- **Application Performance Monitoring:** Monitor application performance and identify issues.

## Disaster Recovery Procedures

To ensure the resilience and continuity of the ZebraAI platform, the following disaster recovery procedures are in place for the following:


- Services will be recreated/deployed as needed except for non-ephemeral data
- ZebraAI uses **Azure SQL** for its non-ephemeral OLTP data store
  - Azure SQL Databases are always running on the latest stable version of the SQL Server database engine and patched OS with 99.99% availability
  - The ZebraAI Azure SQL Database uses a DTUs based Standard S6 tier configured with **Zone-redundant backup storage**.
  - Backups are managed by the service as follows:
    - Full backups every week.
    - Differential backups every 12 or 24 hours.
    - Transaction log backups approximately every 10 minutes.
- Data Recovery: In the event of data loss, data recovery procedures will be initiated to restore the most recent backup within 24 hours.
- **We do not CURRENTLY subscribe to Geo-redundant backups**

#### Recovery Time Objective (RTO)

RTO is the maximum acceptable amount of time that a system, application, or process can be down after a failure or disaster occurs before it must be restored to avoid unacceptable consequences.

- **Purpose:** It focuses on the period within which critical operations and systems must be back online to ensure business continuity.
- **Recovery Time Objective (RTO):** 24 hours for service or zone outage. We CURRENTLY do not offer an RTO for a Geo outage/loss.

#### Recovery Point Objective (RPO)

RPO is the maximum acceptable amount of data loss measured in time. It indicates the point in time to which data must be recovered after a disaster to resume normal operations.

- **Purpose:** It focuses on the amount of data that can be lost during a disruption and still be acceptable to the business.
- **Recovery Point Objective (RPO):** 1 hour for DB service or zone outage. We CURRENTLY do not offer an RPO for a Geo outage/loss.

## Security, Privacy and Compliance

Ensuring the security, privacy, and compliance of data is paramount for ZebraAI. To maintain adherence to relevant laws, regulations, and industry standards, ZebraAI implements the following measures:

### Regulatory Compliance
- **Data Protection Regulations:** ZebraAI complies with data protection regulations such as the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) to ensure the privacy and protection of user data.
- **Data Privacy:** The platform ensures compliance with relevant regulations, including GDPR, CCPA, and HIPAA, to safeguard user data.
- **Microsoft and Industry Standards:** ZebraAI adheres to Microsoft and industry standards and best practices for data security.
- **Data Protection Addendum:** ZebraAI adheres to the Microsoft Products and Services Data Protection Addendum, which governs data processing by Azure services.


- **Data Handling Policies:** Strict data handling policies ensure that data is collected, processed, and stored in compliance with relevant regulations.
- **Access Control Policies:** Access control policies govern access ZebraAI and its data, preventing unauthorized access and ensuring data integrity.

### Audits and Assessments

- **Regular Audits:** Audits are conducted regularly to assess compliance with regulatory requirements and industry standards.
- **Risk Assessments:** Periodic risk assessments identify and mitigate potential compliance risks.
- **Data Privacy Audits:** Regular data privacy audits ensure compliance with data protection policies and regulations.

### Data Collection and Processing

- **Data Minimization:** Only necessary data is collected for the operation of ZebraAI.
- **Data Anonymization:** Data is anonymized to protect individual identities (customers and Microsoft employees).
- **Data Encryption:** Data is encrypted both in transit and at rest using industry-standard encryption protocols.

### Data Storage

- **Secure Storage:** Data is stored in secure Azure storage with access controls and encryption.
- **Data Segregation:** Data from different stakeholders is logically segregated to prevent unauthorized access.

### Data Access Controls

- **Role-Based Access Control (RBAC):** RBAC ensures that only authorized personnel have access to sensitive data.
- **Multi-Factor Authentication (MFA):** MFA is required for accessing the AI solution and its data.
- **Audit Logs:** Audit logs of all data access and modifications are maintained to ensure accountability and traceability.

### Communication and Training

- **Employee Training:** Employees receive regular training on data protection regulations, compliance requirements, and best practices for data security.
- **Awareness Programs:** Awareness programs ensure that all stakeholders are informed about compliance requirements and their responsibilities.
- **Reporting and Notification:** Stakeholders are notified of any compliance incidents and the steps taken to resolve them through predefined communication channels.
