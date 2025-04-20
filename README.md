# SAFETY: AI-Powered Workplace Safety Solution

## Team
Islem Chammakhi, Oussama Bouchnak, Achraf Laamari, Firas Ben Ali, and Mohamed Kassem Abbassi

## Problem Statement
Workplace accidents continue to be a significant challenge across industries. Non-compliance with safety equipment requirements is a leading cause of preventable injuries. Traditional safety monitoring relies on manual supervision, which is:
- Inconsistent
- Resource-intensive
- Prone to human error

There is also a lack of engaging safety education and real-time feedback for employees.

**Why It Matters:** Workplace accidents result in human suffering, lost productivity, regulatory penalties, and increased insurance costs.

## Our Solution: SAFETY Platform
An AI-powered web application that transforms workplace safety management:

- **Real-time PPE Detection:** Automated verification of proper safety equipment usage
- **AI-Generated Safety Notifications:** Personalized safety reminders and educational content
- **Safety Analytics Dashboard:** Data-driven insights into compliance rates and risk areas

**Target Audience:** Manufacturing facilities, construction companies, industrial plants, and any environment with strict safety equipment requirements

## Key Use Cases
- **Safety Compliance Verification:** Instantly detect if employees are wearing required safety equipment (helmets, vests, safety shoes)
- **Safety Knowledge Enhancement:** Regular AI-generated notifications educate employees about safety best practices
- **Compliance Monitoring:** Track safety equipment usage rates across departments or work areas
- **Risk Identification:** Identify trends and areas requiring additional safety focus

## Solution Architecture: Functional View
**Three Core Components:**

1. **Employee Safety Detection System**
   - Camera-based image capture
   - AI analysis of safety equipment usage
   - Real-time alerts for non-compliance

2. **AI Notification Engine**
   - Contextual safety reminders
   - Educational content generation
   - Personalized safety messaging

3. **Analytics Dashboard**
   - Safety compliance statistics
   - Trend analysis
   - Performance comparisons

## Solution Architecture: Technical View
**Frontend:**
- Next.js for responsive web interface
- Tailwind CSS for modern, adaptive design

**Backend:**
- Image Processing Pipeline
- AI Analysis Engine
- Notification Management System

**AI Technologies:**
- Gemini 2.0 Flash API for image analysis
- Custom computer vision libraries for equipment detection
- Domain-specific AI notification generation

## AI Implementation Details
**PPE Detection:**
Gemini 2.0 Flash API trained to recognize:
- Safety helmets/hard hats
- High-visibility vests
- Safety footwear
- Additional equipment as required

**Notification Generation:**
Gemini 2.0 Flash API fine-tuned for industrial safety domain with contextually aware message generation based on:
- User role and department
- Recent compliance history
- Industry-specific safety requirements

## Expected Results & Proof of Concept
**Key Metrics:**
- 90%+ accuracy in PPE detection
- 30% improvement in safety compliance rates
- Significant reduction in safety incidents

**Proof of Concept:**
- Functional detection system identifying common safety equipment
- Sample notification system with industry-relevant messaging
- Basic analytics dashboard showing compliance trends

## Impact & Benefits
**For Companies:**
- Reduced workplace accidents and related costs
- Improved regulatory compliance
- Data-driven safety management
- Enhanced safety culture

**For Employees:**
- Increased safety awareness
- Reduced risk of injury
- Continuous education on safety best practices
- Gamified approach to compliance

## Challenges & Solutions
**Challenges:**
- Ensuring detection accuracy in varied lighting conditions
- Privacy concerns with camera-based monitoring
- Encouraging consistent platform usage

**Our Approach:**
- Extensive AI model training with diverse environmental data
- Privacy-first design with immediate processing (no long-term image storage)
- User-friendly interface and engaging notification system

## Next Steps
- Complete development of full detection system
- Expand notification system capabilities
- Develop comprehensive analytics dashboard
- Conduct pilot testing in partner industrial environments
- Gather feedback for platform refinement
