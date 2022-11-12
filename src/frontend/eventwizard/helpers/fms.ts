const ELIM_MAPPING: Record<number, number[]> = {
  1: [1, 1], // (set, match)
  2: [2, 1],
  3: [3, 1],
  4: [4, 1],
  5: [1, 2],
  6: [2, 2],
  7: [3, 2],
  8: [4, 2],
  9: [1, 3],
  10: [2, 3],
  11: [3, 3],
  12: [4, 3],
  13: [1, 1],
  14: [2, 1],
  15: [1, 2],
  16: [2, 2],
  17: [1, 3],
  18: [2, 3],
  19: [1, 1],
  20: [1, 2],
  21: [1, 3],
};

const OCTO_ELIM_MAPPING: Record<number, number[]> = {
  // octofinals
  1: [1, 1], // (set, match)
  2: [2, 1],
  3: [3, 1],
  4: [4, 1],
  5: [5, 1],
  6: [6, 1],
  7: [7, 1],
  8: [8, 1],
  9: [1, 2],
  10: [2, 2],
  11: [3, 2],
  12: [4, 2],
  13: [5, 2],
  14: [6, 2],
  15: [7, 2],
  16: [8, 2],
  17: [1, 3],
  18: [2, 3],
  19: [3, 3],
  20: [4, 3],
  21: [5, 3],
  22: [6, 3],
  23: [7, 3],
  24: [8, 3],

  // quarterfinals
  25: [1, 1],
  26: [2, 1],
  27: [3, 1],
  28: [4, 1],
  29: [1, 2],
  30: [2, 2],
  31: [3, 2],
  32: [4, 2],
  33: [1, 3],
  34: [2, 3],
  35: [3, 3],
  36: [4, 3],

  // semifinals
  37: [1, 1],
  38: [2, 1],
  39: [1, 2],
  40: [2, 2],
  41: [1, 3],
  42: [2, 3],

  // finals
  43: [1, 1],
  44: [1, 2],
  45: [1, 3],
};

const FIRST_MATCH: Record<string, number> = {
  qf: 0,
  sf: 12,
  f: 18,
};

const OCTO_FIRST_MATCH: Record<string, number> = {
  ef: 0,
  qf: 24,
  sf: 36,
  f: 42,
};

export function playoffTypeFromNumber(matchNum: number, is_octo: boolean) {
  if (is_octo) {
    if (matchNum > 0 && matchNum <= 24) return "ef";
    if (matchNum > 24 && matchNum <= 36) return "qf";
    if (matchNum > 36 && matchNum <= 42) return "sf";
    return "f";
  } else {
    if (matchNum > 0 && matchNum <= 12) return "qf";
    if (matchNum > 12 && matchNum <= 18) return "sf";
    return "f";
  }
}

/* Returns one of {ef, qf, sf, f}
 * For use when some reports don't give the match number
 */
function playoffTypeFromMatchString(matchString: string) {
  if (matchString.includes("Tiebreaker")) return null;
  if (matchString.includes("Octofinal")) return "ef";
  if (matchString.includes("Quarterfinal")) return "qf";
  if (matchString.includes("Semifinal")) return "sf";
  if (matchString.includes("Final")) return "f";
  return null;
}

/* Return [type, set #, match #]
 * For use when some reports don't give the match number in the grid
 * ASSUMES 2016 label format, Quarter 1, Quarter 2, ..., Tiebreaker 1, Semi 1, ...
 */
export function playoffTypeMatchAndSet(
  is_octo: boolean,
  match_string: string,
  last_type: string
) {
  let set_num, match_num;
  let match_type = playoffTypeFromMatchString(match_string);
  if (match_type == null) {
    // We've found a "Tiebreaker X" match, assume type is the same as the previous
    match_type = last_type;
    set_num = parseInt(match_string.match(/\d+/g)[0]);
    match_num = 3;
    return [match_type, set_num, match_num];
  } else {
    let schedule_number = parseInt(match_string.match(/\d+/g)[0]);
    let overall_match_num =
      (is_octo ? OCTO_FIRST_MATCH[match_type] : FIRST_MATCH[match_type]) +
      schedule_number;
    let match_and_set = playoffMatchAndSet(overall_match_num, is_octo);
    return [match_type, match_and_set[0], match_and_set[1]];
  }
}

/* Return [set #, match #] */
export function playoffMatchAndSet(totalMatchNum: number, is_octo: boolean) {
  return is_octo
    ? OCTO_ELIM_MAPPING[totalMatchNum]
    : ELIM_MAPPING[totalMatchNum];
}

export function cleanTeamNum(number: number) {
  return number.toString().trim().replace("*", "");
}
