
import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface ProjectResult {
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
}

export interface ProjectDataFile {
  name: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tool: string;
  projectTypes: string[];
  link?: string;
  linkLabel?: string;
  dataFiles?: ProjectDataFile[];
  category: 'Machine Learning' | 'NLP' | 'Data Analysis' | 'Data Visualization';
  imageUrl: string;
  imageHint: string;
  goal: string;
  process: string;
  insights: string;
  results: ProjectResult[];
  placeholderLabel?: string;
  githubUrl?: string;
  docsPath: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Customer Churn Prediction Pipeline',
    description: 'Built an end-to-end churn prediction workflow using supervised learning, feature engineering, and model comparison. The project focuses on clear business interpretation and actionable retention insights rather than only model score optimization.',
    tool: 'Python (scikit-learn, pandas)',
    projectTypes: ['Machine Learning', 'Feature Engineering', 'Model Evaluation'],
    link: 'https://github.com/your-username/customer-churn-pipeline',
    dataFiles: [
      { name: 'customer_data.csv', url: '/project-files/customer_data.csv' },
      { name: 'churn_labels.csv', url: '/project-files/churn_labels.csv' },
      { name: 'customer_data_clean.xlsx', url: '/project-files/customer_data_clean.xlsx' },
    ],
    category: 'Machine Learning',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl ?? '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint ?? '',
    goal: 'Retention teams lacked a reliable way to prioritize at-risk customers early enough for effective intervention.',
    process: 'Data was collected and cleaned, features were engineered from raw transaction history, and multiple classifiers (Logistic Regression, Random Forest) were trained and compared using AUC-ROC as the primary evaluation metric.',
    insights: 'Customers in the 18–35 age group showed the highest churn rates despite high volume, and tenure under 12 months was the strongest predictor of churn across all models.',
    results: [
      {
        title: 'Result 1 – Churn Rate Peaks in Younger Age Groups',
        description: 'Younger customers (ages 18–35) had the highest churn rates despite representing a large customer volume. Targeted retention campaigns in this segment could yield the highest return.',
        imageUrl: 'https://picsum.photos/seed/churn-age/800/450',
        imageHint: 'bar chart churn by age group',
      },
      {
        title: 'Result 2 – Tenure Is the Strongest Predictor',
        description: 'Customers with fewer than 12 months of tenure were 3× more likely to churn. Onboarding improvements and early engagement programs are the highest-leverage interventions.',
        imageUrl: 'https://picsum.photos/seed/churn-tenure/800/450',
        imageHint: 'line chart churn rate by tenure months',
      },
      {
        title: 'Result 3 – Random Forest Outperformed Baseline',
        description: 'The Random Forest model achieved an AUC of 0.87 vs. 0.72 for Logistic Regression baseline, with better precision on the high-risk tier that matters most for retention action.',
      },
    ],
    githubUrl: 'https://github.com/your-username/customer-churn-pipeline',
    docsPath: '/projects/1',
  },
  {
    id: 2,
    title: 'Social Sentiment Intelligence Dashboard',
    description: 'Created an NLP workflow to classify sentiment from social text and visualize trends in an interactive dashboard. The project demonstrates text preprocessing, vectorization, model experimentation, and practical reporting for brand monitoring use cases.',
    tool: 'Python (NLTK, scikit-learn, Plotly)',
    projectTypes: ['NLP', 'Data Visualization', 'Data Cleaning'],
    link: 'https://github.com/your-username/sentiment-intelligence-dashboard',
    dataFiles: [
      { name: 'social_raw.csv', url: '/project-files/social_raw.csv' },
      { name: 'social_clean.xlsx', url: '/project-files/social_clean.xlsx' },
    ],
    category: 'NLP',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-2')?.imageUrl ?? '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-2')?.imageHint ?? '',
    goal: 'Teams needed a quick way to track sentiment trends from high-volume unstructured social text without manual review of every post.',
    process: 'Raw social text was cleaned (stopwords, tokenization, lemmatization), vectorized with TF-IDF, and classified using a Naive Bayes and SVM comparison. Outputs were piped into a Plotly dashboard for trend visualization.',
    insights: 'Negative sentiment spikes correlated strongly with product release cycles, and weekend posts consistently showed more positive sentiment than weekday posts across all categories.',
    results: [
      {
        title: 'Result 1 – Negative Sentiment Spikes Around Product Releases',
        description: 'A clear spike in negative sentiment was identified within 48 hours of each product release, likely driven by unmet expectations and early support issues. Monitoring this window is essential for a rapid response.',
        imageUrl: 'https://picsum.photos/seed/sentiment-release/800/450',
        imageHint: 'time series sentiment line chart',
      },
      {
        title: 'Result 2 – Weekend Posts Are Significantly More Positive',
        description: 'Sentiment scores were on average 23% more positive on weekends vs. weekdays across all product categories, suggesting timing-sensitive opportunities for engagement and promotional content.',
      },
      {
        title: 'Result 3 – SVM Outperformed Naive Bayes on Ambiguous Posts',
        description: 'SVM achieved 82% accuracy vs. 74% for Naive Bayes, with a notable improvement on neutral and mixed-sentiment posts that are hardest to classify correctly.',
      },
    ],
    githubUrl: 'https://github.com/your-username/sentiment-intelligence-dashboard',
    docsPath: '/projects/2',
  },
  {
    id: 3,
    title: 'Retail Sales Forecasting Studio',
    description: 'Designed a time-series forecasting project to estimate near-term sales trends and support inventory planning decisions. Includes baseline comparisons, error analysis, and visualization for non-technical stakeholders.',
    tool: 'Python (statsmodels, Prophet, matplotlib)',
    projectTypes: ['Data Analysis', 'Data Visualization', 'Data Cleaning'],
    link: 'https://github.com/your-username/retail-sales-forecasting',
    dataFiles: [
      { name: 'sales_raw.csv', url: '/project-files/sales_raw.csv' },
      { name: 'sales_processed.xlsx', url: '/project-files/sales_processed.xlsx' },
      { name: 'store_metadata.csv', url: '/project-files/store_metadata.csv' },
    ],
    category: 'Data Analysis',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-3')?.imageUrl ?? '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-3')?.imageHint ?? '',
    goal: 'Planning teams required better short-term demand estimates to reduce costly stock mismatches and improve inventory turnover.',
    process: 'Historical sales data was cleaned and decomposed into trend, seasonality, and residual components. ARIMA and Facebook Prophet models were trained, compared on MAPE, and the best-performing model was used to generate 12-week forward forecasts.',
    insights: 'Seasonal spikes around public holidays accounted for 40% of annual variance, and Prophet outperformed ARIMA on datasets with strong weekly seasonality patterns.',
    results: [
      {
        title: 'Result 1 – Holiday Spikes Drive 40% of Annual Sales Variance',
        description: 'Public holidays and promotional periods account for 40% of the total year-on-year sales variance. Accurate pre-holiday stock positioning is the single highest-leverage planning opportunity.',
        imageUrl: 'https://picsum.photos/seed/sales-seasonality/800/450',
        imageHint: 'time series sales chart with holiday markers',
      },
      {
        title: 'Result 2 – Prophet Outperforms ARIMA on Weekly Patterns',
        description: 'Facebook Prophet achieved a MAPE of 6.2% vs. 9.8% for ARIMA on a 12-week holdout, particularly excelling on stores with strong weekly sales rhythms.',
      },
      {
        title: 'Result 3 – 12-Week Forecast Enables Proactive Stock Orders',
        description: 'The 12-week forecast horizon gave planners enough lead time to adjust supplier orders before demand peaks, reducing projected stockout risk by an estimated 30%.',
      },
    ],
    githubUrl: 'https://github.com/your-username/retail-sales-forecasting',
    docsPath: '/projects/3',
  },
  {
    id: 4,
    title: 'Housing Market Analysis in Braga',
    description: 'Investigating housing prices in the Braga district in Portugal.',
    tool: 'Tableau',
    projectTypes: ['Data Visualization', 'Data Cleaning', 'Data Analysis'],
    link: 'https://public.tableau.com/app/profile/your-name/viz/HousingMarketBraga/One',
    linkLabel: 'public.tableau.com/app…ga/One',
    dataFiles: [
      { name: 'house_prices (col...)', url: '/project-files/house_prices_col.csv' },
      { name: 'house_prices_final.xlsx', url: '/project-files/house_prices_final.xlsx' },
    ],
    category: 'Data Visualization',
    imageUrl: '',
    imageHint: 'housing market real estate map portugal',
    goal: 'Detailed project notes have not been added yet.',
    process: 'Detailed project notes have not been added yet.',
    insights: 'Detailed project notes have not been added yet.',
    results: [],
    docsPath: '/projects/4',
  },
];

export type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner';

export interface SkillCategory {
  name: string;
  level: SkillLevel;
  icon: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    level: 'Intermediate',
    icon: 'Code',
    description:
      'Builds maintainable Python and TypeScript solutions for data workflows, dashboards, and portfolio-grade applications.',
  },
  {
    name: 'Databases',
    level: 'Intermediate',
    icon: 'Database',
    description:
      'Comfortable with SQL fundamentals, schema design, and querying structured datasets for analytics use cases.',
  },
  {
    name: 'Cloud',
    level: 'Beginner',
    icon: 'Cloud',
    description:
      'Exploring deployment workflows and managed services for hosting ML demos and data apps.',
  },
  {
    name: 'Machine Learning',
    level: 'Intermediate',
    icon: 'BrainCircuit',
    description:
      'Builds supervised learning pipelines with robust preprocessing, feature engineering, and evaluation practices.',
  },
  {
    name: 'AI',
    level: 'Intermediate',
    icon: 'Bot',
    description:
      'Applies practical AI/NLP patterns in project prototypes, focusing on explainability and usability.',
  },
];

export const tools: string[] = [
    'Python', 'R', 'Java', 'SQL', 'TypeScript',
    'Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'TensorFlow', 'PyTorch', 'Tableau', 'Airflow',
    'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'MySQL', 'PostgreSQL', 'MongoDB',
    'Generative AI', 'Large Language Models'
];


export interface SoftSkill {
  name: string;
  level: SkillLevel;
  icon: string;
  description: string;
}

export const softSkills: SoftSkill[] = [
  {
    name: 'Communication',
    level: 'Intermediate',
    icon: 'MessageCircle',
    description: 'Explains technical decisions clearly to both technical peers and non-technical stakeholders.',
  },
  {
    name: 'Teamwork',
    level: 'Intermediate',
    icon: 'Users',
    description: 'Collaborates effectively in group projects with shared ownership and structured delivery.',
  },
  {
    name: 'Problem Solving',
    level: 'Intermediate',
    icon: 'Puzzle',
    description: 'Breaks complex problems into practical steps and iterates quickly with measurable outputs.',
  },
  {
    name: 'Leadership',
    level: 'Intermediate',
    icon: 'Crown',
    description: 'Takes initiative in project planning, ownership, and delivery follow-through.',
  },
  {
    name: 'Adaptability',
    level: 'Intermediate',
    icon: 'RefreshCw',
    description: 'Learns new tools quickly and adapts project direction based on feedback and constraints.',
  },
];

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Language {
  name: string;
  level: CEFRLevel;
  icon: string;
  description: string;
}

export const languages: Language[] = [
  {
    name: 'English',
    level: 'B2',
    icon: 'Globe',
    description: 'Professional working proficiency in speaking, reading, and writing.',
  },
  {
    name: 'Hindi',
    level: 'C1',
    icon: 'MessageCircle',
    description: 'Full professional fluency in speaking, reading, and writing.',
  },
  {
    name: 'Gujarati',
    level: 'C1',
    icon: 'MessageSquare',
    description: 'Native or near-native communication in everyday and professional settings.',
  },
];


export const aboutMe = {
  description: "I'm Kaushar Halani, a Computer Science (Data Science) student focused on solving practical business problems with clean analysis, dashboards, and actionable reporting. I enjoy turning raw, messy datasets into structured insights that support better decisions.\n\nMy current career target is Data Analyst, where I can strengthen real-world analytics execution and stakeholder communication. Over time, I'm building toward Data Engineer and Data Scientist roles by deepening my skills in data pipelines, modeling, and production-ready ML workflows.\n\nI'm actively looking for internships and entry-level opportunities where I can contribute with discipline, ownership, and continuous learning.",
  imageUrl: PlaceHolderImages.find(p => p.id === 'about-me')?.imageUrl ?? 'https://picsum.photos/seed/104/400/400',
  imageHint: PlaceHolderImages.find(p => p.id === 'about-me')?.imageHint ?? 'portrait headshot',
};

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Data Science Project Lead (Academic)',
    company: 'St. John College of Engineering and Management',
    period: '2024 - Present',
    description: 'Led end-to-end student project execution from problem framing to final presentation, with emphasis on reproducible workflows and practical model evaluation.',
    responsibilities: [
      'Defined project scope, dataset strategy, and measurable success criteria for ML/NLP assignments.',
      'Implemented data preprocessing, feature engineering, and baseline-to-advanced model comparisons.',
      'Prepared technical documentation and demo walkthroughs for faculty and peers.'
    ],
    achievements: [
      'Delivered multiple portfolio-ready projects with clear methodology and reproducible outputs.',
      'Improved project clarity by standardizing notebooks, metrics tracking, and result reporting.',
      'Built confidence in presenting technical outcomes to mixed audiences.'
    ]
  },
  {
    id: 2,
    role: 'Freelance Data & Automation Contributor',
    company: 'Independent',
    period: '2023 - Present',
    description: 'Worked on small-scope freelance and peer projects focused on data cleaning, exploratory analysis, and dashboard-ready outputs.',
    responsibilities: [
      'Converted raw datasets into analysis-ready formats and reusable feature tables.',
      'Built lightweight scripts for recurring reporting and visualization workflows.',
      'Collaborated with requesters to define practical deliverables and timelines.'
    ],
    achievements: [
      'Delivered cleaner and faster analysis handoffs with better documentation quality.',
      'Improved consistency of outputs using reusable notebooks and templates.',
    ]
  },
];

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  details: {
    highlights: string[];
    coursework: string[];
  };
}

export const education: Education[] = [
  {
    id: 3,
    degree: 'B.E. in Computer Science Engineering (Data Science)',
    institution: 'St. John College of Engineering and Management',
    period: '2022 - 2027',
    description: 'Pursuing a comprehensive degree focused on the intersection of computer science and data science, covering core engineering principles, advanced algorithms, and practical data analysis techniques.',
    details: {
      highlights: [
        'Currently pursuing degree with a focus on data science specialization (CSE-DS).',
        'Actively participating in coding clubs and data science workshops.'
      ],
      coursework: [
        'Data Structures & Algorithms',
        'Machine Learning',
        'Database Management Systems',
        'Big Data Analytics',
      ],
    },
  },
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/your-linkedin-handle',
  github: 'https://github.com/your-github-handle',
  twitter: 'https://twitter.com/your-twitter-handle',
};

export const profileLinks = [
    {
      category: 'Social Media',
      icon: 'Users',
      links: [
        { name: 'LinkedIn', url: socialLinks.linkedin },
        { name: 'GitHub', url: socialLinks.github },
        { name: 'Twitter', url: 'https://twitter.com' },
      ],
    },
    {
      category: 'Research',
      icon: 'BookUser',
      links: [
        { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=your-id' },
        { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/your-name' },
      ],
    },
    {
      category: 'Coding Profiles',
      icon: 'Code',
      links: [
        { name: 'HackerRank', url: 'https://hackerrank.com' },
        { name: 'LeetCode', url: 'https://leetcode.com' },
      ],
    },
  ];

