// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DigvosSBT (Soulbound Token)
 * @notice Chứng chỉ số phi tập trung bảo chứng năng lực số. Không thể chuyển nhượng (Soulbound).
 */
contract DigvosSBT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event Attested(address indexed to, uint256 indexed tokenId);
    event Revoked(uint256 indexed tokenId);

    constructor() ERC721("Digvos Soulbound Token", "DVSBT") Ownable(msg.sender) {}

    /**
     * @notice Đúc chứng chỉ SBT mới cho học viên.
     * @param to Địa chỉ ví nhận chứng chỉ của học viên.
     * @param uri URI chứa metadata chứng chỉ (lưu trữ trên Supabase/IPFS).
     */
    function mint(address to, string memory uri) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit Attested(to, tokenId);
        return tokenId;
    }

    /**
     * @notice Thu hồi chứng chỉ SBT (khi phát hiện gian lận hậu kiểm).
     * @param tokenId ID của token cần thu hồi.
     */
    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
        emit Revoked(tokenId);
    }

    /**
     * @dev Ghi đè hàm _update để chặn mọi hành vi chuyển nhượng (Soulbound Token).
     * Chỉ cho phép Đúc (mint) từ address(0) và Thu hồi (burn) về address(0).
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = super._update(to, tokenId, auth);
        
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Transfer of these tokens is blocked.");
        }
        
        return from;
    }
}
