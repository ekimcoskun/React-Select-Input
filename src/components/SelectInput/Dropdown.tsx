import React, { useEffect, useRef, useState, useCallback } from "react";
import { useIcons } from "./icons/useIcons";
import Option from "./Option";
import { DropdownPropTypes } from "./types";

const Dropdown: React.FC<DropdownPropTypes> = (props) => {
  const { LoadingIcon } = useIcons();
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(2);
  const [isAboveMaxSelections, setIsAboveMaxSelections] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!props.onMenuScrollToBottom || props.loading) return;
    const { current } = containerRef;
    if (
      current &&
      current.scrollTop + current.clientHeight + 20 >= current.scrollHeight &&
      props.hasNext &&
      !props.isSearching
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
    const { currentOption } = props;
    if (currentOption && containerRef.current) {
      const optionIndex = props.options.findIndex(
        (option) => option.value === currentOption.value
      );
      if (optionIndex !== -1) {
        const optionElement = containerRef.current.children[optionIndex];
        if (optionElement) {
          const { offsetTop, clientHeight } = optionElement as HTMLDivElement;
          const containerHeight = containerRef.current.clientHeight;
          const scrollTo = offsetTop - (containerHeight - clientHeight) / 2;
          const containerTop = containerRef.current.scrollTop;
          const containerBottom = containerTop + containerHeight;
          if (
            offsetTop < containerTop ||
            offsetTop + clientHeight > containerBottom
          ) {
            containerRef.current.scrollTop = scrollTo;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentOption, props.options]);

  useEffect(() => {
    if (props.isSearching) {
      containerRef.current?.scrollTo(0, 0);
      setPage(2);
    }
  }, [props.isSearching]);


  useEffect(() => {
    setIsAboveMaxSelections(props.selectedOptions.length >= props.maxSelections!);
  }, [props.selectedOptions, props.maxSelections]);

  return (
    <>
      {props.visible === true ? (
        <div className="dropdown-container">
          <div ref={containerRef} className="dropdown-content custom-scrollbar">
            {props.options.length > 0 ? (
              props.options.map((option, index) => (
                <Option
                  key={index}
                  option={option}
                  isCurrent={props.currentOption?.value === option.value}
                  searchText={props.searchText}
                  handleSelectOption={props.handleSelectOption}
                  selected={props.selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value
                  )}
                  isAboveMaxSelections={isAboveMaxSelections}
                />
              ))
            ) : (
              <div className="no-option">No options</div>
            )}

            {props.loading && (
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
