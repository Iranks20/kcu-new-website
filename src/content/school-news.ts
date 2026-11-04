// Matches news stories to schools by topic, so each school page shows its own recent stories.

import { news } from "./news";

const topics: Record<string, RegExp> = {
  "medicine-health-life-sciences": /\b(medic\w*|health|nurs\w*|anatomy|surg\w*|blood|cancer|heart|clinical|white coats?|cmf|ucmf|icmda|screening)\b/i,
  "law-management-sciences": /\b(law|legal|moot|justice|court|judiciary|business|cooperatives?|sacco|economics|tax|equal opportunities|jurisdiction)\b/i,
  "science-computing-engineering": /\b(cyber\w*|forensic\w*|petroleum|geoscience|oil|gas|energy|code ?fest|technology|capture the flag|aqua clean|tilenga|digital|innovation hub)\b/i,
};

export function newsForSchool(school: string, limit = 3) {
  const re = topics[school];
  return re ? news.filter((n) => re.test(`${n.title} ${n.excerpt}`)).slice(0, limit) : [];
}
