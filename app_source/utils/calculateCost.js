

/**
 * Tính tổng tiền thuê cho một cosplayer.
 * @param {number} salaryIndex 
 * @param {number} totalHour 
 * @param {number} characterPrice 
 * @param {number} totalDays 
 * @returns {number} 
 */
export function calculateCosplayerCost(salaryIndex, totalHour, characterPrice, totalDays) {
    return (salaryIndex * totalHour) + (characterPrice * totalDays);
  }
  
  /**
   * Tính tổng số giờ thuê từ danh sách các ngày thuê.
   * @param {Array} requestDateResponses - Danh sách các ngày thuê với thuộc tính totalHour.
   * @returns {number} - Tổng số giờ thuê.
   */
  export function calculateTotalHours(requestDateResponses) {
    if (!Array.isArray(requestDateResponses)) return 0;
    return requestDateResponses.reduce((sum, date) => sum + (date.totalHour || 0), 0);
  }
  
  /**
   * Tính tổng số ngày thuê từ danh sách ngày thuê.
   * @param {Array} requestDateResponses - Danh sách các ngày thuê.
   * @returns {number} - Tổng số ngày.
   */
  export function calculateTotalDays(requestDateResponses) {
    if (!Array.isArray(requestDateResponses)) return 0;
    return requestDateResponses.length;
  }
  