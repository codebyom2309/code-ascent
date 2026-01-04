/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: certifications
 * Interface for Certifications
 */
export interface Certifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  certificationName?: string;
  /** @wixFieldType text */
  issuingOrganization?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  badgeImage?: string;
  /** @wixFieldType date */
  dateIssued?: Date | string;
  /** @wixFieldType url */
  verificationUrl?: string;
}


/**
 * Collection ID: experience
 * Interface for Experience
 */
export interface Experience {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType boolean */
  isCurrent?: boolean;
  /** @wixFieldType text */
  responsibilities?: string;
}


/**
 * Collection ID: expertise
 * Interface for Expertise
 */
export interface Expertise {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  areaOfExpertise?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType number */
  proficiencyLevel?: number;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType text */
  rolePerformed?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType number */
  proficiencyLevel?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  skillLogo?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
}


/**
 * Collection ID: sociallinks
 * Interface for SocialLinks
 */
export interface SocialLinks {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  platformName?: string;
  /** @wixFieldType url */
  platformUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  platformIcon?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: stats
 * Interface for HeroSectionStatistics
 */
export interface HeroSectionStatistics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  statisticLabel?: string;
  /** @wixFieldType text */
  statisticValue?: string;
  /** @wixFieldType text */
  unit?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}
