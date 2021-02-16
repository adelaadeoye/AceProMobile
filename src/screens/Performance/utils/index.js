import Colors from 'sm/utils/Colors'

export const getHeight = (val, totalHeight) => {
  var total_height = (val / 10) * (totalHeight - 50)
  return total_height
}

export const getLineHeight = (data) => {
  let height = data.reduce((a, c) => a + c, 0) / data.length;
  return height
}

export const getLineRotation = (holes) => {
  let b = {};
  let mode, maxi = 0;
  for (let k of holes) {
    if (b[k]) b[k]++; else b[k] = 1;
    if (maxi < b[k]) { mode = k; maxi = b[k] }
  }
  return mode
}

export const graph1_data = [{
  date: "Oct 20",
  coach: 6,
  athlete: 8
}, {
  date: "Oct 21",
  coach: 8,
  athlete: 8
}, {
  date: 'Oct 22',
  coach: 2,
  athlete: 4
}, {
  date: 'Oct 23',
  coach: 8,
  athlete: 4
}, {
  date: 'Oct 24',
  coach: 9,
  athlete: 8
}]

export const pie_data = [{
  name: 'Physical Training',
  percentage: 15,
  color: '#e97665',
  legendFontSize: 15,
  legendFontColor: Colors.AmberRed
}, {
  name: "Skill Training",
  percentage: 5,
  color: '#ee9889',
  legendFontSize: 15,
  legendFontColor: Colors.AmberRed
}, {
  name: "Team Training",
  percentage: 20,
  color: '#f7c9c1',
  legendFontSize: 15,
  legendFontColor: Colors.AmberRed
}, {
  name: 'Games',
  percentage: 60,
  color: '#e35540',
  legendFontSize: 15,
  legendFontColor: Colors.AmberRed
}]

export const getHeight2 = (val, totalHeight) => {
  var total_height = (val / 150) * (totalHeight - 50)
  return total_height
}
