import { useEffect, useRef, useState, useCallback } from "react";
import { useIcons } from "./icons/useIcons";
import Option from "./Option";
import { DropdownPropTypes } from "./types";

const Dropdown = (props: DropdownPropTypes) => {
  const { LoadingIcon } = useIcons();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleScroll = useCallback(() => {
    if (!props.onMenuScrollToBottom || props.loading) return;
    const { current } = containerRef;
    if (
      current &&
      current.scrollTop + current.clientHeight >= current.scrollHeight
    ) {
      props.onMenuScrollToBottom(page);
      setPage((prevPage) => prevPage + 1);
    }
  }, [props, page]);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsFetching(props.loading);
  }, [props.loading]);

  return (
    <>
      {props.visible === true ? (
        <div className="dropdown-container" ref={containerRef}>
          <div className="dropdown-content custom-scrollbar">
            {props.options.map((option, index) => (
              <Option
                key={index}
                option={option}
                isCurrent={props.currentOption?.value === option.value}
                searchText={props.searchText}
                handleSelectOption={props.handleSelectOption}
                selected={props.selectedOptions.some(
                  (selectedOption) => selectedOption.value === option.value
                )}
              />
            ))}
            {isFetching && (
              <div className="loading-container">
                <LoadingIcon />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dropdown;
