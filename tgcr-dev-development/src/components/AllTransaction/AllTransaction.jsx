"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { UIDayDateTime } from "@/utils/dateUtils";
import { generateMeetingRoomName } from "@/utils/jitsi";

// Transaction table component for displaying paginated, filtered list of lesson transactions
const LessonTransactionTable = ({ lang, currentUser, myLessonsDict }) => {
  // State variables for transaction data and filters
  const [transactionData, setTransactionData] = useState([]);

  const [globalSearch, setGlobalSearch] = useState("");
  const [studentQuery, setStudentQuery] = useState("");
  const [teacherQuery, setTeacherQuery] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Fetch transactions whenever any filter or page changes
 useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await axios.post("/api/student/all-transaction", {
        page: currentPage,
        limit: pageSize,
        search: globalSearch,
        studentQuery,
        teacherQuery,
        paymentStatus: paymentStatusFilter,
        startDate,
        endDate,
      });

      const { data, pagination } = response.data;

      console.log("data------------------>>>", data);
      setTransactionData(data);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactionData([]);
    }
  };

  fetchTransactions();
}, [
  currentPage,
  globalSearch,
  studentQuery,
  teacherQuery,
  paymentStatusFilter,
  startDate,
  endDate,
]);  

  // Pagination handlers
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="transaction-table-container">
      <p>{myLessonsDict.pageTitle}</p>

      {/* Filter bar with search and filters */}
      <div className="filter-bar-wrapper">
        <div className="filter-bar">
          {/* Global Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder={myLessonsDict.searchPlaceholder}
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="input-search"
            />
          </div>

          {/* Student Name Filter */}
          <input
            type="text"
            placeholder={myLessonsDict.studentFilterPlaceholder}
            value={studentQuery}
            onChange={(e) => setStudentQuery(e.target.value)}
            className="filter-input"
          />

          {/* Teacher Name Filter */}
          <input
            type="text"
            placeholder={myLessonsDict.teacherFilterPlaceholder}
            value={teacherQuery}
            onChange={(e) => setTeacherQuery(e.target.value)}
            className="filter-input"
          />

          {/* Date Range Filters */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="filter-input"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="filter-input"
          />

          {/* Payment Status Dropdown */}
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">{myLessonsDict.allStatus}</option>
            <option value="Paid">{myLessonsDict.paid}</option>
            <option value="Pending">{myLessonsDict.pending}</option>
            {/* <option value="Failed">{myLessonsDict.failed}</option> */}
          </select>
        </div>
      </div>

      {/* Transaction Table or Empty Message */}
      {transactionData.length === 0 ? (
        <h6 className="no-lesson">{myLessonsDict.noLessons}</h6>
      ) : (
        <>
          {/* Transaction Table */}
          <div className="transaction-table-wrapper">
            <div className="transaction-table-inner">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>{myLessonsDict.studentName}</th>
                    <th>{myLessonsDict.teacherName}</th>
                    <th>{myLessonsDict.dateTime}</th>
                    <th>{myLessonsDict.subject}</th>
                    <th>
                      {myLessonsDict.amount} {myLessonsDict.euro}
                    </th>
                    <th>{myLessonsDict.paymentStatus}</th>
                    <th>{myLessonsDict.transactionId}</th>
                    {/* <th>{myLessonsDict.joinBtn}</th> */}
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((lReq, index) => {
                    const meetingRoomName = generateMeetingRoomName(
                      lReq.requestedStart,
                      lReq.requestedEnd,
                      lReq.id
                    );
                    return (
                      <tr key={`row-${index}`}>
                        {/* Student Name */}
                        <td>{lReq.student?.name || "-"}</td>

                        {/* Instructor Name */}
                        <td>{lReq.instructor?.name || "-"}</td>

                        {/* Lesson Date/Time */}
                        <td>
                          {lReq.requestedStart
                            ? UIDayDateTime(
                                lReq.requestedStart,
                                currentUser.timezone?.tzIdentifier
                              )
                            : "-"}
                        </td>

                        {/* Subject/Class Level */}
                        <td>
                          {lReq.teacherClassLevelCost?.classLevel?.name || "-"}
                        </td>

                        {/* Amount */}
                        <td>
                          {lReq.teacherClassLevelCost?.costPerLesson || "-"}
                        </td>

                        {/* Payment Status */}
                        <td>{lReq.paymentStatus || "-"}</td>

                        {/* Transaction ID */}
                        <td>{lReq.transactionId || "-"}</td>

                        {/* Join Button (if enabled) */}
                        {/* <td>
                          {meetingRoomName && (
                            <Link
                              href={`/${lang}/live-lesson/${meetingRoomName}`}
                              className="default-btn"
                            >
                              {myLessonsDict.joinBtn}
                            </Link>
                          )}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                {myLessonsDict.prev}
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={`page-${i + 1}`}
                  onClick={() => handlePageClick(i + 1)}
                  className={currentPage === i + 1 ? "active-page" : ""}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                {myLessonsDict.next}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LessonTransactionTable;
