function skillsMember(){
    var skills = ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'Ruby', 'Java', 'C++', 'C#'];
    var skill = skills[Math.floor(Math.random()*skills.length)];
    return skill;
}