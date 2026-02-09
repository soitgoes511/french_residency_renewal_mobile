window.APP_CONFIG = {
    "profiles": {
        "common": {
            "id": "common",
            "name_en": "Common Requirements",
            "name_fr": "Exigences communes",
            "description_en": "Documents required for all applicants",
            "description_fr": "Documents requis pour tous les demandeurs",
            "icon": "📋"
        },
        "spouse_french": {
            "id": "spouse_french",
            "name_en": "Spouse of French Citizen",
            "name_fr": "Époux de Français",
            "description_en": "Additional documents for those married to a French national",
            "description_fr": "Documents supplémentaires pour les conjoints de Français",
            "icon": "💍"
        },
        "worker": {
            "id": "worker",
            "name_en": "Worker / Employee",
            "name_fr": "Salarié",
            "description_en": "Documents for employed applicants",
            "description_fr": "Documents pour les salariés",
            "icon": "💼"
        },
        "self_employed": {
            "id": "self_employed",
            "name_en": "Self-Employed / Business Owner",
            "name_fr": "Travailleur indépendant",
            "description_en": "Documents for self-employed or business owners",
            "description_fr": "Documents pour les travailleurs indépendants",
            "icon": "🏢"
        }
    },
    "categories": {
        "identity": {
            "name_en": "Identity Documents",
            "name_fr": "Documents d'identité",
            "icon": "🪪"
        },
        "residence": {
            "name_en": "Proof of Residence",
            "name_fr": "Justificatifs de domicile",
            "icon": "🏠"
        },
        "financial": {
            "name_en": "Financial Documents",
            "name_fr": "Documents financiers",
            "icon": "💰"
        },
        "administrative": {
            "name_en": "Administrative Documents",
            "name_fr": "Documents administratifs",
            "icon": "📋"
        },
        "integration": {
            "name_en": "Integration Requirements",
            "name_fr": "Conditions d'intégration",
            "icon": "🇫🇷"
        },
        "family": {
            "name_en": "Family Documents",
            "name_fr": "Documents familiaux",
            "icon": "👨‍👩‍👧"
        },
        "payment": {
            "name_en": "Payment",
            "name_fr": "Paiement",
            "icon": "💳"
        }
    },
    "metadata": {
        "last_verified": "2026-02-07",
        "source_url": "https://www.service-public.fr/",
        "notes": "Requirements based on service-public.gouv.fr official documentation"
    },
    "permit_types": [
        {
            "id": "carte_resident",
            "name_en": "EU Long-Term Resident Card (10 years)",
            "name_fr": "Carte de Résident de Longue Durée-UE",
            "description": "10-year residence card. Requires 3 years of residence for spouses of French citizens, 5 years otherwise.",
            "official_url": "https://www.service-public.fr/particuliers/vosdroits/F17359",
            "cost": 225,
            "last_verified": "2026-02-07"
        },
        {
            "id": "titre_sejour",
            "name_en": "Residence Permit (Renewal)",
            "name_fr": "Titre de Séjour",
            "description": "Renewal of your current residence permit (typically 1-4 years).",
            "official_url": "https://www.service-public.fr/particuliers/vosdroits/N110",
            "cost": 225,
            "last_verified": "2026-02-07"
        }
    ],
    "documents": {
        "carte_resident": [
            {
                "id": "cr_passport",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "Passeport valide",
                "name_en": "Valid Passport",
                "description": "Pages showing civil status, validity dates, entry stamps, and visas.",
                "link": null,
                "link_text": "Already possessed",
                "validity_days": null
            },
            {
                "id": "cr_birth_certificate",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "Copie intégrale d'acte de naissance",
                "name_en": "Full Birth Certificate Copy",
                "description": "Recent copy with all mentions. For foreign-born, must be apostilled and translated by a sworn translator.",
                "link": "https://www.diplomatie.gouv.fr/fr/services-aux-francais/l-annuaire-des-traducteurs-interpretes-assermenters/",
                "link_text": "Find a sworn translator",
                "validity_days": null
            },
            {
                "id": "cr_photos",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "3 photos d'identité / e-photo",
                "name_en": "3 ID Photos / e-photo",
                "description": "Recent passport-style photos or digital e-photo code from an approved service.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F10619",
                "link_text": "Photo requirements",
                "validity_days": null
            },
            {
                "id": "cr_proof_of_address",
                "profiles": [
                    "common"
                ],
                "category": "residence",
                "name_fr": "Justificatif de domicile (moins de 6 mois)",
                "name_en": "Proof of Address (less than 6 months)",
                "description": "Utility bill (electricity, gas, water, internet), rent receipt, or property tax notice.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F33052",
                "link_text": "Official requirements",
                "validity_days": 180
            },
            {
                "id": "cr_residence_proof_5years",
                "profiles": [
                    "common"
                ],
                "category": "residence",
                "name_fr": "Justificatifs de séjour (3 ou 5 ans)",
                "name_en": "Proof of Residence (3 or 5 years)",
                "description": "Previous permits, renewal receipts, etc. proving continuous legal residence (3 years for spouses of French citizens, 5 years otherwise).",
                "link": null,
                "link_text": "Gather from your records",
                "validity_days": null
            },
            {
                "id": "cr_resources_5years",
                "profiles": [
                    "common"
                ],
                "category": "financial",
                "name_fr": "Justificatifs de ressources (3 ou 5 ans)",
                "name_en": "Proof of Resources (3 or 5 years)",
                "description": "Pay slips, tax notices, pension statements, etc. for the last 3 years (spouses) or 5 years (others).",
                "link": "https://www.impots.gouv.fr/",
                "link_text": "Tax portal (avis d'imposition)",
                "validity_days": null
            },
            {
                "id": "cr_employment_contract",
                "profiles": [
                    "worker"
                ],
                "category": "financial",
                "name_fr": "Contrat de travail",
                "name_en": "Employment Contract",
                "description": "Current employment contract or employer attestation.",
                "link": null,
                "link_text": "Request from employer",
                "validity_days": null
            },
            {
                "id": "cr_payslips",
                "profiles": [
                    "worker"
                ],
                "category": "financial",
                "name_fr": "Bulletins de salaire (3 derniers mois)",
                "name_en": "Pay Slips (last 3 months)",
                "description": "Your three most recent pay slips.",
                "link": null,
                "link_text": "Request from employer",
                "validity_days": 90
            },
            {
                "id": "cr_kbis",
                "profiles": [
                    "self_employed"
                ],
                "category": "financial",
                "name_fr": "Extrait K-bis ou inscription registre",
                "name_en": "K-bis Extract or Registry Inscription",
                "description": "Proof of business registration (less than 3 months old).",
                "link": "https://www.infogreffe.fr/",
                "link_text": "Infogreffe",
                "validity_days": 90
            },
            {
                "id": "cr_business_accounts",
                "profiles": [
                    "self_employed"
                ],
                "category": "financial",
                "name_fr": "Bilans comptables",
                "name_en": "Business Financial Statements",
                "description": "Last 2-3 years of business accounts.",
                "link": null,
                "link_text": "From your accountant",
                "validity_days": null
            },
            {
                "id": "cr_marriage_cert",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Acte de mariage",
                "name_en": "Marriage Certificate",
                "description": "Full copy of marriage certificate, less than 3 months old. If married abroad, must be transcribed to French civil registry.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F1432",
                "link_text": "Marriage certificate info",
                "validity_days": 90
            },
            {
                "id": "cr_spouse_nationality",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Justificatif de nationalité française du conjoint",
                "name_en": "Spouse's French Nationality Proof",
                "description": "Spouse's CNI (carte d'identité), passport, or certificate of French nationality.",
                "link": null,
                "link_text": "Spouse's ID document",
                "validity_days": null
            },
            {
                "id": "cr_community_life",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Justificatif de communauté de vie",
                "name_en": "Proof of Living Together",
                "description": "Joint utility bills, lease with both names, joint tax declaration, or joint bank account.",
                "link": null,
                "link_text": "Joint household documents",
                "validity_days": 180
            },
            {
                "id": "cr_spouse_declaration",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Déclaration sur l'honneur de vie commune",
                "name_en": "Declaration of Shared Life",
                "description": "Signed declaration attesting that you live together as a couple.",
                "link": null,
                "link_text": "Signed personal statement",
                "validity_days": null
            },
            {
                "id": "cr_health_insurance",
                "profiles": [
                    "common"
                ],
                "category": "administrative",
                "name_fr": "Justificatif d'assurance maladie",
                "name_en": "Health Insurance Certificate",
                "description": "Carte Vitale or attestation from Ameli showing your affiliation to French social security.",
                "link": "https://www.ameli.fr/",
                "link_text": "Ameli - Download attestation",
                "validity_days": null
            },
            {
                "id": "cr_non_polygamy",
                "profiles": [
                    "common"
                ],
                "category": "administrative",
                "name_fr": "Déclaration sur l'honneur de non polygamie",
                "name_en": "Declaration of Non-Polygamy",
                "description": "Required if married and from a country where polygamy is legal. Sworn statement that you are not in a polygamous marriage.",
                "link": null,
                "link_text": "Signed personal statement",
                "validity_days": null
            },
            {
                "id": "cr_french_b1",
                "profiles": [
                    "common"
                ],
                "category": "integration",
                "name_fr": "Attestation niveau B1 français",
                "name_en": "French B1 Level Certificate",
                "description": "Diploma, test result, or linguistic attestation proving French proficiency at B1 level or higher. Exempt if over 65.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F34501",
                "link_text": "Language requirements",
                "validity_days": null
            },
            {
                "id": "cr_civic_exam",
                "profiles": [
                    "common"
                ],
                "category": "integration",
                "name_fr": "Attestation de réussite examen civique",
                "name_en": "Civic Exam Success Certificate",
                "description": "Certificate proving you passed the civic examination about French values and institutions.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F39530",
                "link_text": "Civic exam information",
                "validity_days": null
            },
            {
                "id": "cr_republican_commitment",
                "profiles": [
                    "common"
                ],
                "category": "integration",
                "name_fr": "Engagement à respecter les principes de la République",
                "name_en": "Republican Principles Commitment",
                "description": "Signed document committing to respect the principles of the French Republic.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F38329",
                "link_text": "Download form",
                "validity_days": null
            },
            {
                "id": "cr_timbre_fiscal",
                "profiles": [
                    "common"
                ],
                "category": "payment",
                "name_fr": "Timbre fiscal (225€)",
                "name_en": "Tax Stamp (€225)",
                "description": "€200 tax + €25 stamp duty. Can be purchased online. Required at card pickup.",
                "link": "https://timbres.impots.gouv.fr/",
                "link_text": "Purchase online",
                "validity_days": null
            }
        ],
        "titre_sejour": [
            {
                "id": "ts_passport",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "Passeport valide",
                "name_en": "Valid Passport",
                "description": "Pages showing civil status, validity dates, entry stamps, and visas.",
                "link": null,
                "link_text": "Already possessed",
                "validity_days": null
            },
            {
                "id": "ts_current_permit",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "Titre de séjour actuel",
                "name_en": "Current Residence Permit",
                "description": "Your current titre de séjour that you are renewing.",
                "link": null,
                "link_text": "Already possessed",
                "validity_days": null
            },
            {
                "id": "ts_photos",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "3 photos d'identité / e-photo",
                "name_en": "3 ID Photos / e-photo",
                "description": "Recent passport-style photos or digital e-photo code from an approved service.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F10619",
                "link_text": "Photo requirements",
                "validity_days": null
            },
            {
                "id": "ts_birth_certificate",
                "profiles": [
                    "common"
                ],
                "category": "identity",
                "name_fr": "Acte de naissance",
                "name_en": "Birth Certificate",
                "description": "Full copy of your birth certificate. For foreign-born, may need apostille and sworn translation.",
                "link": null,
                "link_text": "Already possessed or request from home country",
                "validity_days": null
            },
            {
                "id": "ts_proof_of_address",
                "profiles": [
                    "common"
                ],
                "category": "residence",
                "name_fr": "Justificatif de domicile (moins de 3 mois)",
                "name_en": "Proof of Address (less than 3 months)",
                "description": "Utility bill (electricity, gas, water, internet), rent receipt, or property tax notice.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F33052",
                "link_text": "Official requirements",
                "validity_days": 90
            },
            {
                "id": "ts_tax_notice",
                "profiles": [
                    "common"
                ],
                "category": "financial",
                "name_fr": "Avis d'imposition",
                "name_en": "Tax Notice",
                "description": "Your most recent French tax notice (avis d'imposition).",
                "link": "https://www.impots.gouv.fr/",
                "link_text": "Tax portal",
                "validity_days": null
            },
            {
                "id": "ts_resources",
                "profiles": [
                    "worker"
                ],
                "category": "financial",
                "name_fr": "Justificatifs de ressources",
                "name_en": "Proof of Resources",
                "description": "Last 3 pay slips, employer attestation letter, or employment contract.",
                "link": null,
                "link_text": "Request from employer",
                "validity_days": 90
            },
            {
                "id": "ts_employment_contract",
                "profiles": [
                    "worker"
                ],
                "category": "financial",
                "name_fr": "Contrat de travail ou attestation employeur",
                "name_en": "Employment Contract or Employer Letter",
                "description": "Current employment contract or attestation from employer.",
                "link": null,
                "link_text": "Request from employer",
                "validity_days": null
            },
            {
                "id": "ts_kbis",
                "profiles": [
                    "self_employed"
                ],
                "category": "financial",
                "name_fr": "Extrait K-bis",
                "name_en": "K-bis Extract",
                "description": "Proof of business registration (less than 3 months old).",
                "link": "https://www.infogreffe.fr/",
                "link_text": "Infogreffe",
                "validity_days": 90
            },
            {
                "id": "ts_business_income",
                "profiles": [
                    "self_employed"
                ],
                "category": "financial",
                "name_fr": "Justificatifs de revenus professionnels",
                "name_en": "Proof of Business Income",
                "description": "Tax returns, business accounts, or revenue declarations.",
                "link": null,
                "link_text": "From your accountant",
                "validity_days": null
            },
            {
                "id": "ts_marriage_cert",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Acte de mariage",
                "name_en": "Marriage Certificate",
                "description": "Full copy of marriage certificate, less than 3 months old.",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F1432",
                "link_text": "Marriage certificate info",
                "validity_days": 90
            },
            {
                "id": "ts_spouse_nationality",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Justificatif de nationalité française du conjoint",
                "name_en": "Spouse's French Nationality Proof",
                "description": "Spouse's CNI, passport, or certificate of French nationality.",
                "link": null,
                "link_text": "Spouse's ID document",
                "validity_days": null
            },
            {
                "id": "ts_community_life",
                "profiles": [
                    "spouse_french"
                ],
                "category": "family",
                "name_fr": "Justificatif de communauté de vie",
                "name_en": "Proof of Living Together",
                "description": "Joint utility bills, lease with both names, joint tax declaration, or joint bank account.",
                "link": null,
                "link_text": "Joint household documents",
                "validity_days": 180
            },
            {
                "id": "ts_health_insurance",
                "profiles": [
                    "common"
                ],
                "category": "administrative",
                "name_fr": "Attestation d'affiliation Sécurité Sociale",
                "name_en": "Social Security Certificate",
                "description": "Attestation from Ameli showing your affiliation to French social security.",
                "link": "https://www.ameli.fr/",
                "link_text": "Ameli - Download attestation",
                "validity_days": null
            },
            {
                "id": "ts_republican_commitment",
                "profiles": [
                    "common"
                ],
                "category": "integration",
                "name_fr": "Engagement à respecter les principes de la République",
                "name_en": "Republican Principles Commitment",
                "description": "Signed document committing to respect the principles of the French Republic (required since July 2024).",
                "link": "https://www.service-public.fr/particuliers/vosdroits/F38329",
                "link_text": "Download form",
                "validity_days": null
            },
            {
                "id": "ts_timbre_fiscal",
                "profiles": [
                    "common"
                ],
                "category": "payment",
                "name_fr": "Timbre fiscal (225€)",
                "name_en": "Tax Stamp (€225)",
                "description": "€200 tax + €25 stamp duty. Can be purchased online. Required at card pickup.",
                "link": "https://timbres.impots.gouv.fr/",
                "link_text": "Purchase online",
                "validity_days": null
            }
        ]
    },
    "important_links": [
        {
            "name_fr": "ANEF - Portail de demande en ligne",
            "name_en": "ANEF - Online Application Portal",
            "url": "https://administration-etrangers-en-france.interieur.gouv.fr/",
            "description": "Submit your application online through the official French immigration portal."
        },
        {
            "name_fr": "Service-Public - Informations officielles",
            "name_en": "Service-Public - Official Information",
            "url": "https://www.service-public.fr/particuliers/vosdroits/N110",
            "description": "Official French government information about residence permits."
        },
        {
            "name_fr": "Achat de timbre fiscal",
            "name_en": "Purchase Tax Stamp",
            "url": "https://timbres.impots.gouv.fr/",
            "description": "Official portal to purchase the required tax stamp online."
        }
    ]
};