const normalizePokemonSkills = (skills: any[]) => {
  return skills.map(skill => skill.ability || skill.move);
};

export default normalizePokemonSkills;
