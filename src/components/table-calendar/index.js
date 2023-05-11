import React from "react";

const MOMENT = {
	Sáng: [1, 2, 3, 4, 5, 6],
	Chiều: [7, 8, 9, 10, 11, 12],
	Tối: [13, 14, 15, 16],
};

const WEEK = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

function TableCalendar({ data }) {
	const map = data.reduce((val, item) => {
		val[item.id_day] = [...(val[item.id_day] || []), item];
		return val;
	}, {});

	return (
		<>
			<table style={{ border: "1px solid", borderCollapse: "collapse" }}>
				<thead>
					<th>Buổi</th>
					<th>Tiết</th>
					{WEEK.map((date) => (
						<th style={{ width: "12%" }}>{date}</th>
					))}
				</thead>
				{Object.values(MOMENT)
					.flat()
					.map((period, index) => {
						const moment = Object.entries(MOMENT).reduce(
							(val, [key, value]) =>
								value.includes(period) ? key : val,
							""
						);
						const rowSpan =
							MOMENT[moment][0] === period
								? MOMENT[moment].length
								: 0;

						return (
							<tr key={index.toString()}>
								{!!rowSpan && (
									<td rowSpan={rowSpan}>{moment}</td>
								)}
								<td>{period}</td>
								{WEEK.map((date) => {
									const subject = (map[date] || []).find(
										({ lesson }) =>
											lesson
												.split(",")
												.includes(period.toString())
									);
									if (subject) {
										const {
											lesson,
											tenhp,
											id_classroom,
											teacherName,
										} = subject;
										if (lesson.startsWith(period)) {
											return (
												<td
													key={date}
													rowSpan={
														lesson.split(",").length
													}
													style={{
														background:
															"antiquewhite",
													}}
												>
													{tenhp} <br />
													{teacherName} <br />(
													{id_classroom})<br />
												</td>
											);
										}
										return null;
									}
									return <td key={date}></td>;
								})}
							</tr>
						);
					})}
			</table>
			<style>{`
  table {
      width: 100%;
      text-align: center;}
  table, th, td {
border: 1px solid black;
padding: 10px;
}`}</style>
		</>
	);
}

export default React.memo(TableCalendar);
