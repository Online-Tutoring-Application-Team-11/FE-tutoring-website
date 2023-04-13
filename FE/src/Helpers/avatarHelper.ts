export function nameToColor(name: string) {
  let hash = 0;
  let i;
  
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  
  return color;
}
  
export function nameToInitials(fName: string, lName: string) {
  let initials = "";
  initials += fName.charAt(0);
  initials += lName.charAt(0);

  return initials;
}
